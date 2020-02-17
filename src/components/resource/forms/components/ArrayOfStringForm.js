import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(1)
  }
}))

export const ArrayOfStringForm = ({ disabled, name, label, value, error, errorMessage, onChange }) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={e => { e.preventDefault() }} autoComplete="off">
      <TextField
        fullWidth
        disabled={disabled}
        id={name}
        label={label}
        placeholder={label}
        value={value.join(', ')}
        error={error}
        helperText={errorMessage}
        onChange={onChange}
        variant="outlined"
        inputProps={{ spellCheck: 'false' }}
      />
    </form>
  )
}
