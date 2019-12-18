import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DialogCreateUpdate } from './DialogCreateUpdate'
import { DialogDelete } from './DialogDelete'
import { baseErrorMessage, getErrorMessage } from '../utils/getErrorMessage'
import axios from 'axios'
import { ArrayOfChipsCell } from './cellTypes/ArrayOfChipsCell'

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

const TablePaginationActions = (props) => {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const useStyles2 = makeStyles(theme => ({
  paper: {
    width: '98%',
    marginTop: theme.spacing(2),
    marginLeft: '1%',
    marginRight: '1%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  button: {
    marginTop: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  error: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    color: '#e91e63'
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(1)
  }
}))

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#cecece',
    color: '#454545',
    fontSize: 12,
    fontWeight: 700
  },
  body: {
    fontSize: 14
  },
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#efefef',
    },
  },
}))(TableRow)

export const ResourcePaginationTable = (props) => {
  const classes = useStyles2()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''})

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.items.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Empty item (with some default values) to be used to create new items
  let newItem = {}
  props.columns.forEach(col => {
    if (col.hasOwnProperty('defaultValue')) {
      newItem[col.fieldName] = col.defaultValue
    } else {
      if (col.type === Array) newItem[col.fieldName] = []
      else if (col.type === Object) newItem[col.fieldName] = {}
      else newItem[col.fieldName] = ''
    }
  })

  const onAxiosRequest = (method) => {
    setErrorStatus({ error: false, message: '' })

    let reqConfig = {
      method: method,
      url: props.endpoints[method]
    }

    let tokenString = `?token=${window.sessionStorage.getItem('token')}`

    if (method === 'post') {
      reqConfig.url = `${reqConfig.url}${tokenString}`
      reqConfig.data = {...selectedItem}
    } else if (method === 'put') {
      reqConfig.url = `${reqConfig.url.replace(':id', selectedItem._id)}${tokenString}`
      reqConfig.data = {...selectedItem}
      delete reqConfig.data._id
    } else {  // delete
      reqConfig.url = `${reqConfig.url.replace(':id', selectedItem._id)}${tokenString}`
    }

    axios(reqConfig)
      .then(response => {
        if (response.data.ok) {
          // OK

          // Updating page number
          if (method === 'delete') {
            if ((props.items.length - 1 - page * rowsPerPage) === 0) {
              if (page > 0) setPage(page => page - 1)
            }
          } else if (method === 'post') {
            setPage(0)
          }

          // Refreshing items
          let request = `${props.endpoints.get}${tokenString}`
          let timestamp = new Date().getTime()
          props.refreshItems(`${request}&timestamp=${timestamp.toString()}`)  // Refresh items (on changing the request, the useEffect in ResourceTab is triggered to fetch items)
        } else {
          // Error
          console.log(getErrorMessage(response.data))
          setErrorStatus({ error: true, message: baseErrorMessage })
        }
      })
      .catch(error => {
        // Unknown Error
        console.error(error)
        setErrorStatus({ error: true, message: baseErrorMessage })
      })
  }

  const showErrorStatusOrLoading = () => {
    if (errorStatus.error) {
      return (
        <div className={classes.error}>
          <ErrorIcon style={{verticalAlign: 'middle'}}/>&nbsp;{errorStatus.message}
        </div>
      )
    }
    else {
      if (props.loading) {
        return (
          <div className={classes.loading}>
            <CircularProgress size={24} thickness={4} />
          </div>
        )
      } else {
        return (
          <div className={classes.grow}>&nbsp;</div>
        )
      }
    }
  }

  return (
    <div>
      <Toolbar variant="dense">
        {showErrorStatusOrLoading()}
        {!props.loading &&
          <Button variant="contained" color="primary" size="small" className={classes.button} onClick={() => { setSelectedItem({...newItem}); setErrorStatus({ error: false, message: '' }); setOpenDialog(true) }}>
            Crear Entrada
          </Button>}
      </Toolbar>

      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {props.columns.map((col, index) => (
                  <StyledTableCell align="left" key={index}>
                    {col.label.toUpperCase()}
                  </StyledTableCell>
                ))}
                <StyledTableCell>
                  &nbsp;
                </StyledTableCell>
                <StyledTableCell>
                  &nbsp;
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : props.items
              ).map((row, i) => (
                <StyledTableRow key={i}>
                  {props.columns.map((col, j) => (
                    <StyledTableCell align="left" key={j}>
                      {col.cellType === 'StringCell' &&
                        <span>{row[col.fieldName]}</span>}
                      {col.cellType === 'ArrayOfChipsCell' &&
                        <ArrayOfChipsCell values={row[col.fieldName]} />}
                      {col.cellType === 'ArrayOfIpAddressesCell' &&
                        <ArrayOfChipsCell values={row[col.fieldName].split(',').map(x => x.trim()).filter(x => x!=='')} />}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    <Button size={'small'} onClick={() => { setSelectedItem({...row}); setErrorStatus({ error: false, message: '' }); setOpenDialog(true) }} disabled={props.loading}>
                      <EditOutlinedIcon />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button size={'small'} onClick={() => { setSelectedItem({...row}); setErrorStatus({ error: false, message: '' }); setOpenDialogDelete(true) }} disabled={props.loading}>
                      <DeleteOutlinedIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={props.columns.length + 2} />
                </TableRow>
              )}
            </TableBody>
            {!props.loading &&
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    colSpan={props.columns.length + 2}
                    count={props.items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>}
          </Table>
        </div>
      </Paper>

      <DialogCreateUpdate
        open={openDialog}
        setOpen={setOpenDialog}
        columns={props.columns}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        onSave={() => { selectedItem.hasOwnProperty('_id') ? onAxiosRequest('put') : onAxiosRequest('post') }}
      />

      <DialogDelete
        open={openDialogDelete}
        setOpen={setOpenDialogDelete}
        itemFirstField={selectedItem[props.columns[0].fieldName]}
        onDelete={() => { onAxiosRequest('delete') }}
      />
    </div>
  )
}
