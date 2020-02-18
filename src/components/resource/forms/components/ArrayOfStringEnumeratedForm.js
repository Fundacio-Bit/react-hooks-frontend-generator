import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '98%',
    maxWidth: '98%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(elem, arrayValues, theme) {
  return {
    fontWeight:
      arrayValues.indexOf(elem) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export const ArrayOfStringEnumeratedForm = ({ disabled, name, label, value, allowedValues, error, errorMessage, onChange }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div>
      <FormControl className={classes.formControl} error={error} disabled={disabled}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          id={name}
          multiple
          value={value}
          onChange={onChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((selectedValue, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  size="small"
                  label={selectedValue}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {allowedValues.map((elem, index) => (
            <MenuItem key={index} value={elem} style={getStyles(elem, allowedValues, theme)}>
              {elem}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </div>
  )
}
