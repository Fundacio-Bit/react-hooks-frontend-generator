import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  cell: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap'
  }
}))

export const ArrayOfChipsCell = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.cell}>
      {props.values.map((value, index) => (
        <Chip size="small" label={value} key={index} />
      ))}
    </div>
  )
}
