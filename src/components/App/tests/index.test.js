import { render } from "@testing-library/react";
import App from "../index";

describe("<App/> test", () => {
  it("should render and match the snapshot", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });
});
