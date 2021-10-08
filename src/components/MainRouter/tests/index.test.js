import MainRouter from "../index";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { renderWithAuthProvider } from "../../../utils/testUtils";

describe("<MainRouter/> tests", () => {
  let ctxValue;
  let history;
  beforeEach(() => {
    ctxValue = { user: null };
    history = createMemoryHistory();
  });
  it("should render and match the snapshot", () => {
    const { baseElement } = renderWithAuthProvider(
      <Router history={history}>
        <MainRouter />
      </Router>,
      ctxValue
    );
    expect(baseElement).toMatchSnapshot();
  });

  it("should render the fallback loader on initial load", async () => {
    const { findByRole } = renderWithAuthProvider(
      <Router history={history}>
        <MainRouter />
      </Router>,
      ctxValue
    );
    const loader = await findByRole("progressbar");

    expect(loader).toBeInTheDocument();
  });

  it("should redirect to home when user is not available", async () => {
    renderWithAuthProvider(
      <Router history={history}>
        <MainRouter />
      </Router>,
      ctxValue
    );

    expect(history.location.pathname).toEqual("/");
  });
});
