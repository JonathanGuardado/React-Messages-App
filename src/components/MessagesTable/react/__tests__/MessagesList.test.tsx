import React from 'react';
import { render } from '@testing-library/react';
import MessagesList from '../MessagesList';

describe('MessagesList', () => {
  const defaultProps = {
    variant: 'error',
    title: 'Error Type 1'
  };

  const messages = [
    {
      message: 'This is an error!',
      priority: 0,
      key: 'message-1'
    }, {
      message: 'some text more',
      priority: 0,
      key: 'message-2'
    }]

  test('renders title and messages count', () => {
    const { getByText } = render(<MessagesList {...defaultProps}>
      {messages}
    </MessagesList>);
    expect(getByText('Error Type 1')).toBeInTheDocument();
    expect(getByText('Count 2')).toBeInTheDocument();
  });

  test('renders all the messages', () => {
    const { getByText } = render(<MessagesList {...defaultProps}>
      {messages}
    </MessagesList>);
    expect(getByText('This is an error!')).toBeInTheDocument();
    expect(getByText('some text more')).toBeInTheDocument();
  });


})

