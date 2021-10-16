import { render } from '@testing-library/react';
import React from 'react';
import Home from '../index';

describe('<Home/> Tests', () => {
  // let timeout;
  // beforeAll(() => {
  //   timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // });
  it('should render and match the snapshot', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should render 'Loader' initially in the DOM", () => {
    const { baseElement } = render(<Home />);
    expect(baseElement.querySelector('.loader')).toBeInTheDocument();
  });
});
