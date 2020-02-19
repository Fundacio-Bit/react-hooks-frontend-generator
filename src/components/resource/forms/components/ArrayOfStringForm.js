import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(1)
  },
  textField: {
    width: '30%'
  },
  button: {
    marginTop: theme.spacing(1)
  },
  cell: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.1),
    },
  }
}))

export const ArrayOfStringForm = ({ disabled, name, label, value, error, errorMessage, onChange }) => {
  const classes = useStyles()

  const [element, setElement] = useState('')

  const handleAddElement = () => {
    if (element.trim() !== '') {
      setElement('')
      onChange({ target: { value: [...value, element.trim()] }})
    }
  }

  const handleDeleteChip = (chipToDelete) => () => {
    onChange({ target: { value: [...value].filter((chip, index) => index !== chipToDelete) }})
  }

  return (
    <div>
      <div className={classes.cell}>
        {value.map((elem, index) => (
          <Chip
            key={index}
            variant="outlined"
            size="small"
            label={elem}
            onDelete={handleDeleteChip(index)}
          />
        ))}
      </div>
      <div>
        <form className={classes.form} onSubmit={e => { e.preventDefault() }} autoComplete="off">
          <TextField
            className={classes.textField}
            disabled={disabled}
            id={name}
            label={label}
            placeholder={label}
            value={element}
            error={error}
            helperText={errorMessage}
            onChange={(e) => { setElement(e.target.value) }}
            variant="outlined"
            inputProps={{ spellCheck: 'false' }}
          />
          &nbsp;&nbsp;
          <Button className={classes.button} onClick={handleAddElement}>
            <AddCircleOutlineOutlinedIcon style={{ color: '#a6a6a6' }} />
          </Button>
        </form>
      </div>
    </div>
  )
}
