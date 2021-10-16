import { fireEvent } from '@testing-library/react';
import { renderWithAuthProvider } from '../../../utils/testUtils';
import AddComment from '../index';

describe('<AddComment/> tests', () => {
  let contextValue;
  beforeEach(() => {
    contextValue = { user: null };
  });
  it('should render and match the snapshot', () => {
    const imageId = 123;
    const { baseElement } = renderWithAuthProvider(<AddComment imageId={imageId} />, contextValue);
    expect(baseElement).toMatchSnapshot();
  });

  it('should change the value on change', async () => {
    contextValue = { user: { id: 1, name: 'Dev' } };
    const imageId = 123;
    const { findByRole } = renderWithAuthProvider(<AddComment imageId={imageId} />, contextValue);

    const textArea = await findByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'abc' } });

    expect(textArea.value).toEqual('abc');
  });

  // it("should set the value to '' and prevent default behavior on click", async () => {
  //   contextValue = { user: { id: 1, name: "Dev" } };
  //   const imageId = 123;
  //   const { findByRole } = renderWithAuthProvider(
  //     <AddComment imageId={imageId} />,
  //     contextValue
  //   );

  //   const textArea = await findByRole("textbox");
  //   const btn = await findByRole("button");

  //   const event = { preventDefault: jest.fn() };
  //   fireEvent.change(textArea, { target: { value: "xyz" } });

  //   fireEvent.click(btn, event);

  //   await timeout(500);
  //   expect(event.preventDefault).toBeCalled();
  //   expect(textArea.value).toEqual("");
  // });
});
