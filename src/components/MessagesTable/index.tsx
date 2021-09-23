import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { MessagesContext } from '../../contexts/MessagesContexts';
import MessagesList from './react/MessagesList'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Message } from '../../Api';

const useStyles = makeStyles((theme) => ({
  buttonsBar: {
    marginBottom: '30px',
    '& > button': {
      margin: theme.spacing(1),
    },
  }
}
));

const MessagesTable = () => {
  const { warningMessages, errorMessages, infoMessages, clearMessages, isListening, setIsListening } = useContext(MessagesContext)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<Message>();
  const [errorsShown, setErrorsShown] = useState<String[]>([])
  const classes = useStyles();
  const clearButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={clearMessages}
    >
      CLEAR
    </Button>
  )
  const listenButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setIsListening(!isListening)}
    >
      {isListening ? 'STOP' : 'START'}
    </Button>
  )

  useEffect(() => {
    const newErrorMessage = errorMessages[0]
    if (newErrorMessage && !errorsShown.includes(newErrorMessage.key)) {
      setShowError(true)
      setError(newErrorMessage)
      setErrorsShown(errors => [...errors, newErrorMessage.key])
    }
  }, [errorMessages])// eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => setShowError(false)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid container justifyContent="center" >
          <div className={classes.buttonsBar}>
            {listenButton()}
            {clearButton()}
          </div>
        </Grid>
        <Grid item xs={4}>
          <MessagesList title={'Error Type 1'} variant="error">{errorMessages}</MessagesList>
        </Grid>
        <Grid item xs={4}>
          <MessagesList title={'Warning Type 2'} variant="warning">{warningMessages}</MessagesList>
        </Grid>
        <Grid item xs={4}>
          <MessagesList title={'Info Type 3'} variant="info">{infoMessages}</MessagesList>
        </Grid>
      </Grid>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={showError}
        onClose={handleClose}
        data-testid="error-alert"
      >
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleClose}>
          {error?.message}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}


export default MessagesTable;