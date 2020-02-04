import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'
import axios from 'axios'
import { baseErrorMessage, getErrorMessage } from './utils/getErrorMessage'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  error: {
    color: '#e91e63'
  }
}))

export const Login = (props) => {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [loginStatus, setLoginStatus] = useState({error: false, message: ''})

  const handleClickButton = () => {
    if (username === '') return setLoginStatus({error: true, message: 'Debe rellenar el campo Nombre de usuario'})
    if (pwd === '') return setLoginStatus({error: true, message: 'Debe rellenar el campo Contraseña'})
    setLoginStatus({ error: false, message: '' })

    // Connect to login endpoint
    // --------------------------
    axios.post(props.endpoint, { username: username, pwd: pwd })
      .then(response => {

        // OK. Set session parameters

        window.sessionStorage.setItem('token', response.data.token)
        props.setLoggedProfile(username)
        props.setIsLogged(true)
      })
      .catch(error => {
        if (error.response) {
          setLoginStatus({ error: true, message: getErrorMessage(error.response.data) })
        } else {
          setLoginStatus({ error: true, message: baseErrorMessage })
          if (error.request) {
            console.log('Request:', error.request)
          } else {
            console.log('Error:', error.message)
          }
        }
        console.log('Config:', error.config)
      })
  }

  const showLoginStatus = () => {
    if (loginStatus.error) {
      return (
        <div className={classes.error}>
          &nbsp;<ErrorIcon style={{verticalAlign: 'middle'}}/>&nbsp;{loginStatus.message}
        </div>
      )
    }
    else {
      return (
        <div>&nbsp;</div>
      )
    }
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Autenticación
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={event => setUsername(event.target.value)}
              inputProps={{ spellCheck: "false" }}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pwd}
              onChange={event => setPwd(event.target.value)}
            />
          </FormControl>
          <br />
          {showLoginStatus()}
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickButton}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </main>
  )
}
