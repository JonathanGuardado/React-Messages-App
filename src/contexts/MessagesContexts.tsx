import React, { useState, createContext, FC } from 'react';
import { MessageContextShape } from "../lib/types";
import { Message } from '../Api';

export const contextDefaultValues: MessageContextShape = {
  errorMessages: [],
  warningMessages: [],
  infoMessages: [],
  deleteMessage: () => { },
  clearMessages: () => { },
  addMessage: () => { },
  isListening: true,
  setIsListening: () => { }
};

export const MessagesContext = createContext<MessageContextShape>(contextDefaultValues);

export const MessagesProvider: FC = ({ children }) => {
  const [errorMessages, setErrorMessages] = useState<Message[]>([]);
  const [warningMessages, setWarningMessages] = useState<Message[]>([]);
  const [infoMessages, setInfoMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState<Boolean>(true);

  const addMessage = (message: Message) => {
    if (message.priority === 0) {
      setErrorMessages(oldMessages => [message, ...oldMessages])
    } else if (message.priority === 1) {
      setWarningMessages(oldMessages => [message, ...oldMessages])
    } else {
      setInfoMessages(oldMessages => [message, ...oldMessages])
    }
  }

  const deleteMessage = (message: Message) => {
    if (message.priority === 0) {
      setErrorMessages(errorMessages.filter(m => m.key !== message.key))
    } else if (message.priority === 1) {
      setWarningMessages(warningMessages.filter(m => m.key !== message.key))
    } else {
      setInfoMessages(infoMessages.filter(m => m.key !== message.key))
    }
  }

  const clearMessages = () => {
    setErrorMessages([])
    setWarningMessages([])
    setInfoMessages([])
  }

  return (
    <MessagesContext.Provider value={{
      errorMessages,
      warningMessages,
      infoMessages,
      deleteMessage,
      clearMessages,
      addMessage,
      isListening,
      setIsListening
    }}>
      {children}
    </MessagesContext.Provider>
  )

}

