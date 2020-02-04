import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '98%',
    maxWidth: '98%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  }
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

function getStyles(value, selectedValue, theme) {
  return {
    fontWeight:
      selectedValue.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export const ArraySelectMultipleChipsForm = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={props.columnFieldName}>{props.columnLabel}</InputLabel>
        <Select
          id={props.columnFieldName}
          multiple
          value={props.value}
          onChange={props.onChange}
          input={<Input id={props.columnFieldName} />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((value, index) => (
                <Chip key={index} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.allowedValues.map((value, index) => (
            <MenuItem key={index} value={value} style={getStyles(value, props.value, theme)}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
