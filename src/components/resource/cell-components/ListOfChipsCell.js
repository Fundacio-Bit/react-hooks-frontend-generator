import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  cell: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.1),
    },
  }
}))

export const ListOfChipsCell = ({ values }) => {
  const classes = useStyles()

  return (
    <div className={classes.cell}>
      {values.map((value, index) => (
        <Chip
          key={index}
          variant="outlined"
          size="small"
          label={value}
        />
      ))}
    </div>
  )
}
