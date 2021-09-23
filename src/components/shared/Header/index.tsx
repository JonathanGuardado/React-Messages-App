import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    paddingLeft: '5px',
    marginBottom: '10px',
    width: '100%',
    borderBottom: '1px solid black'
  }
});

type Props = {
  children: String
}

const Header = ({ children }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.header}>
      <h2>{children}</h2>
    </div>
  )
}

export default Header