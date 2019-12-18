import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

export const DialogDelete = (props) => {

  const handleClose = () => {
    props.setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">{"¿Desea eliminar el registro?"}</DialogTitle>
        <DialogContent>
          {props.itemFirstField}
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={() => { props.onDelete(); handleClose() }} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
