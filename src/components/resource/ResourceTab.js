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

export const ResourceTab = (props) => {
  const classes = useStyles()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState({error: false, message: ''})
  const [request, setRequest] = useState(`${props.endpoints.get}?token=${window.sessionStorage.getItem('token')}`)

  useEffect(() => {
    let unmounted = false

    const fetchData = async () => {
      if (!unmounted) {
        setErrorStatus({error: false, message: ''})
        setLoading(true)
      }

      try {
        const response = await axios.get(request)

        if (response.data.ok) {
          // OK
          setTimeout(() => {
            if (!unmounted) {
              setErrorStatus({error: false, message: ''})
              setLoading(false)
              setItems(response.data.items)
            }
          }, 850)
        } else {
          // Error
          if (!unmounted) {
            console.log(getErrorMessage(response.data))
            setErrorStatus({ error: true, message: baseErrorMessage })
            setLoading(false)
          }
        }

      } catch (error) {
        if (!unmounted) {
          console.error(error)
          setErrorStatus({ error: true, message: baseErrorMessage })
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => unmounted = true

  }, [request])

  return (
    <div>
      {errorStatus.error &&
        <div className={classes.error}>
          &nbsp;<ErrorIcon style={{verticalAlign: 'middle'}}/>&nbsp;{errorStatus.message}
        </div>}

      {!errorStatus.error &&
        <ResourcePaginationTable
          columns={props.columns}
          items={items}
          setItems={setItems}
          endpoints={props.endpoints}
          refreshItems={setRequest}
          loading={loading}
        />}
    </div>
  )
}
