/* eslint-disable import/prefer-default-export */
import { createBrowserHistory, createMemoryHistory } from 'history';

const isTest = () => {
  return process.env.NODE_ENV === 'test';
};

export const history = isTest()
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();
