import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from '../../../Api';
import MessageCard from './Message'
import { MessagesListProps } from '../../../lib/types'

const useStyles = makeStyles((theme) => ({
  ditem: {
    width: '100%',
  },
  buttonsBar: {
    marginBottom: '30px',
    '& > button': {
      margin: theme.spacing(1),
    },
  },
  columnHeader: {
    marginBottom: '10px'
  },
  columnTitle: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
}
));

const MessagesList = ({ children: messages, variant, title }: MessagesListProps) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <>
        <div className={classes.columnHeader}>
          <div className={classes.columnTitle}>{title}</div>
          Count {messages.length}
        </div>
        {messages.map((m: Message) => (
          <Grid container key={`wrapper-${m.key}`}>
            <MessageCard variant={variant}>{m}</MessageCard>
          </Grid>
        ))}
      </>
    </Grid>
  )
}

export default MessagesList;