import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Profile } from './components/Profile'
import { Login } from './components/Login'
import { AppContainer } from './components/AppContainer'
import { loginEndpoint } from './app-config'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
})

export const App = () => {
  const classes = useStyles()

  const [isLogged, setIsLogged] = useState(false)
  const [loggedProfile, setLoggedProfile] = useState('')

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.grow}>
            FrontEnd Generator
          </Typography>
          {isLogged &&
            <Profile
              username={loggedProfile}
              cleaningLoginSession={() => { setIsLogged(false); window.sessionStorage.clear() }}
            />}
        </Toolbar>
      </AppBar>
      {!isLogged &&
        <Login
          endpoint={loginEndpoint}
          setIsLogged={setIsLogged}
          setLoggedProfile={setLoggedProfile}
        />}
      {isLogged &&
        <AppContainer
          isLogged={isLogged}
        />}
    </div>
  )
}
