import React, { useContext } from 'react';
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import Header from './components/shared/Header'
import MessageTable from './components/MessagesTable'
import { MessagesContext } from './contexts/MessagesContexts';
import Container from '@material-ui/core/Container';

const App: React.FC<{}> = () => {
  const { addMessage, isListening } = useContext(MessagesContext)

  useEffect(() => {
    const subscription = generateMessage((message: Message) => {
      if (isListening) {
        addMessage(message)
      }
    });
    return subscription;
  }, [isListening]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Header>nunffsaid.com Coding Challenge</Header>
      <Container maxWidth="lg">
        <MessageTable />
      </Container>
    </React.Fragment>
  );
}

export default App;
