import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DialogCreateUpdate } from './DialogCreateUpdate'
import { DialogDelete } from './DialogDelete'
import { baseErrorMessage, getErrorMessage } from '../utils/getErrorMessage'
import axios from 'axios'
// import { ArrayOfChipsCell } from './cell-components/ArrayOfChipsCell'
import { TablePaginationActions } from './TablePaginationActions'

const useStyles2 = makeStyles(theme => ({
  paper: {
    width: '96%',
    marginTop: theme.spacing(2),
    marginLeft: '2%',
    marginRight: '2%',
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
    color: '#505050',
    fontSize: 11.4,
    fontWeight: 700
  },
  body: {
    color: '#252525',
    fontSize: 13.2
  },
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f3f3f3',
    },
  },
}))(TableRow)

export const ResourcePaginationTable = ({ restEndpoint, columns, items, loading, setTimestamp }) => {
  const classes = useStyles2()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''})

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)

  const primaryKeyField = columns.filter(x => x.isPrimaryKey).map(x => x.fieldName)[0]

  // Handle change of page number and rows per page
  // -----------------------------------------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Empty item (with some default values) to be used to create new items
  // ---------------------------------------------------------------------
  let newItem = {}
  columns.forEach(col => {
    if (col.hasOwnProperty('defaultValue')) {
      newItem[col.fieldName] = col.defaultValue
    } else {
      if (col.type === Array) newItem[col.fieldName] = []
      else if (col.type === Object) newItem[col.fieldName] = {}
      else newItem[col.fieldName] = ''
    }
  })

  // Handle request to REST API
  // ---------------------------
  const onAxiosRequest = (method) => {
    setErrorStatus({ error: false, message: '' })

    let reqConfig = {
      method: method,
      baseURL: restEndpoint,
      url: method !== 'post' ? `/${selectedItem[primaryKeyField]}` : '',
      data: method !== 'delete' ? {...selectedItem} : {},
      headers: { authorization: window.sessionStorage.getItem('token') }
    }

    axios(reqConfig)
      .then(response => {

        // OK

        // Updating page number
        if (method === 'delete') {
          if ((items.length - 1 - page * rowsPerPage) === 0) {
            if (page > 0) setPage(page => page - 1)
          }
        } else if (method === 'post') {
          setPage(0)
        }

        // Refreshing items of the table
        let timestamp = new Date().getTime()
        setTimestamp(timestamp.toString())  // here the useEffect in ResourceTab is triggered to fetch items
      })
      .catch(error => {
        // Error shown in the web page
        setErrorStatus({ error: true, message: baseErrorMessage })

        // Error shown in the console
        if (error.response) {
          console.log(getErrorMessage(error.response.data))
        } else if (error.request) {
          console.log('Request:', error.request)
        } else {
          console.log('Error:', error.message)
        }
        console.log('Config:', error.config)
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
      if (loading) {
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
        {!loading &&
          <Button variant="contained" color="primary" size="small" className={classes.button} onClick={() => { setSelectedItem({...newItem}); setErrorStatus({ error: false, message: '' }); setOpenDialog(true) }}>
            <span style={{ fontSize: 11.5 }}>Crear Entrada</span>
          </Button>}
      </Toolbar>

      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
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
                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : items
              ).map((row, i) => (
                <StyledTableRow key={i}>
                  {columns.map((col, j) => (
                    <StyledTableCell align="left" key={j}>
                      {row[col.fieldName]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    <Button size={'small'} onClick={() => { setSelectedItem({...row}); setErrorStatus({ error: false, message: '' }); setOpenDialog(true) }} disabled={loading}>
                      <EditOutlinedIcon fontSize="small" style={{ color: '#252525' }} />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button size={'small'} onClick={() => { setSelectedItem({...row}); setErrorStatus({ error: false, message: '' }); setOpenDialogDelete(true) }} disabled={loading}>
                      <DeleteOutlinedIcon fontSize="small" style={{ color: '#252525' }} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length + 2} />
                </TableRow>
              )}
            </TableBody>
            {!loading &&
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    colSpan={columns.length + 2}
                    count={items.length}
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
        columns={columns}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        onSave={() => { selectedItem.hasOwnProperty(primaryKeyField) ? onAxiosRequest('put') : onAxiosRequest('post') }}
      />

      <DialogDelete
        open={openDialogDelete}
        setOpen={setOpenDialogDelete}
        itemFirstField={selectedItem[columns[0].fieldName]}
        onDelete={() => { onAxiosRequest('delete') }}
      />
    </div>
  )
}
