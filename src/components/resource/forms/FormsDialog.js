import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { FormsBody } from './FormsBody'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const FormsDialog = ({ open, setOpen, dialogType, fields, itemValues, setItemValues, onSave }) => {

  const [validationStatuses, setValidationStatuses] = useState({})

  // Initialize validation statuses
  // -------------------------------
  useEffect(() => {
    let statuses = {}
    fields.forEach(field => { statuses[field.fieldName] = { error: false, message: '' }})
    setValidationStatuses(statuses)
  }, [fields, open])

  const handleClose = () => {
    setOpen(false)
  }

  // ------------------------------
  // Validates forms before saving
  // ------------------------------
  const handleSave = () => {
    let statuses = {}
    fields.forEach(field => { statuses[field.fieldName] = { error: false, message: '' } })
    let currentValues = {...itemValues}

    fields.forEach(field => {
      let currentType = field.schema.type
      let currentField = field.fieldName

      // String to number case (integer or float)
      if (currentType === 'number' && typeof(currentValues[currentField]) === 'string') {
        if (!(/^-?\d+\.?\d*$/.test(currentValues[currentField].trim().replace(',', '.')))) {
          statuses[currentField] = { error: true, message: 'El valor debe ser numérico' }
        } else {
          currentValues[currentField] = parseFloat(currentValues[currentField].trim().replace(',', '.'))
        }
      }

      // String to integer case
      if (currentType === 'integer' && typeof(currentValues[currentField]) === 'string') {
        if (!(/^-?\d+$/.test(currentValues[currentField].trim()))) {
          statuses[currentField] = { error: true, message: 'El valor debe ser entero' }
        } else {
          currentValues[currentField] = parseInt(currentValues[currentField].trim(), 10)
        }
      }

      // Check if a foreign key column has value = ''
      if (field.isForeignKey && currentValues[currentField] === '') {
        statuses[currentField] = { error: true, message: 'Seleccione una opción de la lista' }
      }

      // Validate current value with JSON schema
      // ----------------------------------------
      if (!statuses[currentField].error) {  // skip validation if there are previous errors
        let validate = field.validate
        if (!validate(currentValues[currentField])) {
          statuses[currentField] = { error: true, message: `Valor inválido (${validate.errors.map(x => x.message).join(', ')})` }
        }
      }

    })

    if (Object.values(statuses).filter(x => x.error).length === 0) {
      onSave()
      setOpen(false)
    } else {
      setValidationStatuses(statuses)
    }

  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar variant="dense">
            <Button color="inherit" onClick={handleClose}>
              <CloseIcon />
              &nbsp;Cerrar
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="inherit" onClick={handleSave} disabled={false}>
              <SaveIcon />
              &nbsp;Guardar
            </Button>
            &nbsp;&nbsp;&nbsp;{''}
          </Toolbar>
        </AppBar>

        <FormsBody
          fields={fields}
          itemValues={itemValues}
          setItemValues={setItemValues}
          validationStatuses={validationStatuses}
        />

      </Dialog>
    </div>
  )
}
