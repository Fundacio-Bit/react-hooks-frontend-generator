import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(1)
  }
}))

export const ArrayOfIpAddressesForm = (props) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={e => { e.preventDefault() }} autoComplete="off">
      <TextField
        label={props.columnLabel}
        placeholder={props.columnLabel}
        helperText="Introducir direcciones IP separadas por comas."
        id={props.columnFieldName}
        fullWidth
        variant="outlined"
        value={props.value}
        error={false}
        inputProps={{ spellCheck: "false" }}
        onChange={props.onChange}
      />
    </form>
  )
}
