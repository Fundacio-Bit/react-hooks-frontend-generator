import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { getErrorMessage } from '../../../utils/getErrorMessage'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '98%',
    maxWidth: '98%'
  }
}))

export const SelectFromExternalSourceForm = ({ disabled, name, label, value, endpoint, idField, shownFields, error, errorMessage, onChange }) => {
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = useState('')  // important: initial value for Select component must be set to ''.
  const [values, setValues] = useState([])

  useEffect(() => {
    let unmounted = false

    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: { authorization: window.sessionStorage.getItem('token') }
        })

        // OK
        if (!unmounted) {
          setValues(response.data)
          setSelectedValue(value)
          // console.log(JSON.stringify(response.data))
        }

      } catch (error) {
        // Error shown in the console
        if (error.response) {
          console.log(getErrorMessage(error.response.data))
        } else if (error.request) {
          console.log('Request:', error.request)
        } else {
          console.log('Error:', error.message)
        }
        console.log('Config:', error.config)
      }

    }

    fetchData()

    return () => unmounted = true

  }, [endpoint, value])

  return (
    <div>
      <FormControl className={classes.formControl} error={error} disabled={disabled}>
      <InputLabel id={name}>{label}</InputLabel>
        <Select
          id={name}
          value={selectedValue}
          onChange={onChange}
        >
        {values.map((item, index) => (
          <MenuItem key={index} value={item[idField]}>{shownFields.map((x, i) => i === 0 ? item[x] : `[${item[x]}]`).join(' ')}</MenuItem>
        ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </div>
  )
}
