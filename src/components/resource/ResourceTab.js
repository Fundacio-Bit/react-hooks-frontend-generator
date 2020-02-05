import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error'
import axios from 'axios'
import { ResourcePaginationTable } from './ResourcePaginationTable'
import { baseErrorMessage, getErrorMessage } from '../utils/getErrorMessage'

const useStyles = makeStyles(theme => ({
  error: {
    marginTop: theme.spacing(1),
    color: '#e91e63'
  }
}))

export const ResourceTab = ({ restEndpoint, columns }) => {
  const classes = useStyles()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''})
  const [timestamp, setTimestamp] = useState((new Date().getTime()).toString())

  useEffect(() => {
    let unmounted = false

    const fetchData = async () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''})
        setLoading(true)
      }

      try {
        const response = await axios.get(restEndpoint, {
          headers: { authorization: window.sessionStorage.getItem('token') }
        })

        // OK
        setTimeout(() => {
          if (!unmounted) {
            setErrorStatus({error: false, message: ''})
            setLoading(false)
            setItems(response.data)
          }
        }, 850)

      } catch (error) {
        if (!unmounted) {
          // Error shown in the web page
          setErrorStatus({ error: true, message: baseErrorMessage })

          // Error shown in the console
          if (error.response) {
            console.log(getErrorMessage(error.response.data))
          } else if (error.request) {
            console.log('Request:', error.request)
          } else {
            console.log('Error:', error.message)
          }
          console.log('Config:', error.config)

          setLoading(false)
        }
      }

    }

    fetchData()

    return () => unmounted = true

  }, [restEndpoint, timestamp])

  return (
    <div>
      {errorStatus.error &&
        <div className={classes.error}>
          &nbsp;<ErrorIcon style={{verticalAlign: 'middle'}}/>&nbsp;{errorStatus.message}
        </div>}

      {!errorStatus.error &&
        <ResourcePaginationTable
          restEndpoint={restEndpoint}
          columns={columns}
          items={items}
          loading={loading}
          setTimestamp={setTimestamp}
        />}
    </div>
  )
}
