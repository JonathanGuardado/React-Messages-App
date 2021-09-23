import { Message } from '../Api';

export type MessagesListProps = {
    title: string,
    variant: string,
    children: Message[],
}

export type MessageProps = {
    variant: string,
    children: Message,
}

export type MessageContextShape = {
    errorMessages: Message[],
    warningMessages: Message[],
    infoMessages: Message[],
    deleteMessage: (message: Message) => void,
    clearMessages: () => void,
    addMessage: (message: Message) => void,
    isListening: Boolean,
    setIsListening: (listen: Boolean) => void
}