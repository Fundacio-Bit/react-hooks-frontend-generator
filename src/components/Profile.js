import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export const Profile = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLoginDisconnect = () => {
    setAnchorEl(null)
    props.cleaningLoginSession()
  }

  return (
    <div>
      <Button
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {props.username}&nbsp;&nbsp;
        <AccountCircleIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLoginDisconnect}>Desconectar</MenuItem>
      </Menu>
    </div>
  )
}
