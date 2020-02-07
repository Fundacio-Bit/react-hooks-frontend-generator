import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(1)
  }
}))

export const StringForm = ({ disabled, columnLabel, columnFieldName, value, onChange}) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={e => { e.preventDefault() }} autoComplete="off">
      <TextField
        disabled={disabled}
        label={columnLabel}
        placeholder={columnLabel}
        id={columnFieldName}
        fullWidth
        variant="outlined"
        value={value}
        error={false}
        inputProps={{ spellCheck: "false" }}
        onChange={onChange}
      />
    </form>
  )
}
