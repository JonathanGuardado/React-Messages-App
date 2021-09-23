import React from 'react';
import { render } from '@testing-library/react';
import { MessagesContext, contextDefaultValues } from '../contexts/MessagesContexts'
import { MessageContextShape } from "../lib/types";
import App from '../App';

describe('app', () => {
  const getContext = (overrides?: any) => ({
    ...contextDefaultValues,
    ...overrides
  });

  const componentWithContext = (context: MessageContextShape) => (
    <MessagesContext.Provider value={context}>
      <App />
    </MessagesContext.Provider>
  )

  test('renders learn react link', () => {
    const comp = render(<App />);
    expect(comp).toBeTruthy();
  });

  test('does not render more messages if the app is not listening', () => {
    const addMessageCallback = jest.fn()
    const context = getContext({ isListening: false, addMessage: addMessageCallback })
    render(componentWithContext(context));
    expect(addMessageCallback).not.toHaveBeenCalled()
  })

  test('renders more messages if the app is listening', () => {
    const addMessageCallback = jest.fn()
    const context = getContext({ isListening: true, addMessage: addMessageCallback })
    render(componentWithContext(context));
    expect(addMessageCallback).toHaveBeenCalled()
  })
})

