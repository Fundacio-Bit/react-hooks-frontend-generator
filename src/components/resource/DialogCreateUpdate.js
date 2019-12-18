import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { StringForm } from './formTypes/StringForm'
import { ArraySelectMultipleChipsForm } from './formTypes/ArraySelectMultipleChipsForm'
import { ArrayOfIpAddressesForm } from './formTypes/ArrayOfIpAddressesForm'

const useStyles = makeStyles(theme => ({
  cellSection: {
    padding: theme.spacing(2)
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const DialogCreateUpdate = (props) => {
  const classes = useStyles()

  const handleClose = () => {
    props.setOpen(false)
  }

  const handleChangeColumnValue = (column, value) => {
    let changedItem = {...props.selectedItem}
    changedItem[column] = value
    props.setSelectedItem(changedItem)
  }

  const generateForms = () => {
    let forms = []

    props.columns.forEach((column, index) => {
      if (column.formType === 'StringForm') {
        forms.push(
          <StringForm
            key={index}
            columnLabel={column.label}
            columnFieldName={column.fieldName}
            value={props.selectedItem[column.fieldName]}
            onChange={(e) => { handleChangeColumnValue(column.fieldName, e.target.value) }}
          />
        )
      } else if (column.formType === 'ArraySelectMultipleChipsForm') {
        forms.push(
          <ArraySelectMultipleChipsForm
            key={index}
            columnLabel={column.label}
            columnFieldName={column.fieldName}
            allowedValues={column.allowedValues}
            value={props.selectedItem[column.fieldName]}
            onChange={(e) => { handleChangeColumnValue(column.fieldName, e.target.value) }}
          />
        )
      } else if (column.formType === 'ArrayOfIpAddressesForm') {
        forms.push(
          <ArrayOfIpAddressesForm
            key={index}
            columnLabel={column.label}
            columnFieldName={column.fieldName}
            value={props.selectedItem[column.fieldName]}
            onChange={(e) => { handleChangeColumnValue(column.fieldName, e.target.value) }}
          />
        )
      }
    })

    return forms
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar variant="dense">
            <Button color="inherit" onClick={handleClose}>
              <CloseIcon />
              &nbsp;Cerrar
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="inherit" onClick={() => { props.onSave(); handleClose() }} disabled={false}>
              <SaveIcon />
              &nbsp;Guardar
            </Button>
            &nbsp;&nbsp;&nbsp;{''}
          </Toolbar>
        </AppBar>

        <div className={classes.cellSection}>
          {generateForms()}
        </div>

      </Dialog>
    </div>
  )
}
