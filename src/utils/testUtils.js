/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { AuthContext } from '../providers/AuthProvider';

export const timeout = (delay) => new Promise((res) => setTimeout(res, delay));
export const renderWithProvider = (children, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <ToastProvider>{children}</ToastProvider>
    </AuthContext.Provider>,
    renderOptions
  );
};
