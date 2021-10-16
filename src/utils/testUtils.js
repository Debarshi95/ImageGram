import { render } from '@testing-library/react';
import { AuthContext } from '../provider/AuthProvider';

export const timeout = (delay) => new Promise((res) => setTimeout(res, delay));
export const renderWithAuthProvider = (Comp, value = {}) =>
  render(<AuthContext.Provider value={value}>{Comp}</AuthContext.Provider>);
