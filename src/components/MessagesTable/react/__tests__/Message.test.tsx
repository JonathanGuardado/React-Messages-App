import React from 'react';
import { render } from '@testing-library/react';
import Message from '../Message';

describe('Message', () => {
  const defaultProps = {
    variant: 'error',
    title: 'Error Type 1'
  };

  const errorMessage = {
    message: 'This is an Error!',
    priority: 2,
    key: 'message-1'
  }
  const warningMessage = {
    message: 'This is a warning!',
    priority: 2,
    key: 'message-2'
  }
  const infoMessage = {
    message: 'This is a info message',
    priority: 2,
    key: 'message-3'
  }

  describe('renders message variants', () => {
    test('renders error variant', () => {
      const { getByText } = render(<Message variant="error">
        {errorMessage}
      </Message>);
      const message = getByText('This is an Error!').closest('.MuiCard-root')
      expect(message).toBeInTheDocument();
      expect(message?.className).toContain('errorVariant')
    });

    test('renders warning variant', () => {
      const { getByText } = render(<Message variant="warning">
        {warningMessage}
      </Message>);
      const message = getByText('This is a warning!').closest('.MuiCard-root')
      expect(message).toBeInTheDocument();
      expect(message?.className).toContain('warningVariant')
    });

    test('renders info variant', () => {
      const { getByText } = render(<Message variant="info">
        {infoMessage}
      </Message>);
      const message = getByText('This is a info message').closest('.MuiCard-root')
      expect(message).toBeInTheDocument();
      expect(message?.className).toContain('infoVariant')
    });
  })
})

