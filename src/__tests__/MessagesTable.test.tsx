import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MessagesTable from '../components/MessagesTable';
import { MessagesContext, contextDefaultValues } from '../contexts/MessagesContexts'
import { MessageContextShape } from "../lib/types";
import userEvent from "@testing-library/user-event";

describe('MessagesTable', () => {
  const getContext=(overrides?:any) => ({
    ...contextDefaultValues,
    isListening:true,
    errorMessages: [
      {
        message: 'This is an error!',
        priority: 0,
        key: 'message-3'
      }
    ],
    ...overrides
  });
  const componentWithContext =(context:MessageContextShape) => (
    <MessagesContext.Provider value={context}>
      <MessagesTable />
    </MessagesContext.Provider>
  )
  test('renders MessagesTable component', () => {
    const comp = render(<MessagesTable />);
    expect(comp).toBeTruthy();
  });

  test('stops listening messages if STOP is clicked', () => {
    const setIsListeningCallback= jest.fn()
    const context = getContext({setIsListening:setIsListeningCallback})
    const { getByText } = render(componentWithContext(context));
    const stopBtn = getByText('STOP')
    expect(stopBtn).toBeInTheDocument();
    userEvent.click(stopBtn)
    expect(setIsListeningCallback).toHaveBeenCalledWith(false)
  });

  test('starts listening messages if START is clicked', () => {
    const setIsListeningCallback= jest.fn()
    const context = getContext({setIsListening:setIsListeningCallback, isListening:false})
    const { getByText } = render(componentWithContext(context));
    const startBtn = getByText('START')
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn)
    expect(setIsListeningCallback).toHaveBeenCalledWith(true)
  });

  test('clears all messages if CLEAR is clicked', () => {
    const clearMessagesCallback= jest.fn()
    const context = getContext({clearMessages:clearMessagesCallback})
    const { getByText } = render(componentWithContext(context));
    const clearBtn = getByText('CLEAR')
    expect(clearBtn).toBeInTheDocument();
    userEvent.click(clearBtn)
    expect(clearMessagesCallback).toHaveBeenCalled()
  });

  test('deletes a message if Clear message is clicked', () => {
    const deleteMessageCallback= jest.fn()
    const context = getContext({deleteMessage:deleteMessageCallback})
    const { getByTestId } = render(componentWithContext(context));
    const clearBtn = getByTestId('delete-card')
    expect(clearBtn).toBeInTheDocument();
    userEvent.click(clearBtn)
    expect(deleteMessageCallback).toHaveBeenCalledWith(context.errorMessages[0])
  });

  describe('Errors', ()=>{
    test('shows a snackbar alert on new error received', () => {
      const { getAllByText, getByTestId } = render(componentWithContext(getContext()));
      const errorAlert = getByTestId('error-alert')
      expect(errorAlert).toBeInTheDocument();
      expect(getAllByText('This is an error!')).toHaveLength(2)
    });
  
    test('closes the snackbar alert when X is clicked', async () => {
      const { getByRole, getAllByText } = render(componentWithContext(getContext()));
      const closeBtn = getByRole('button', {name:'Close'})
      userEvent.click(closeBtn)
      expect(closeBtn).toBeInTheDocument();
      await waitFor(()=>expect( getAllByText('This is an error!')).toHaveLength(1)) 
    });
  })
})

