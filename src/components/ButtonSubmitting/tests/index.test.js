import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonSubmitting from "../index";

describe("<ButtonSubmitting/> tests", () => {
  let submitting;
  let disabled;
  let text;
  let handlerSpy;
  beforeEach(() => {
    submitting = false;
    disabled = true;
    text = "Signing in";
    handlerSpy = jest.fn();
  });
  it("should render and match the snapshot", () => {
    const { baseElement } = render(
      <ButtonSubmitting
        text={text}
        handler={handlerSpy}
        submitting={submitting}
        disabled={disabled}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it("should render button when 'submitting' is false", () => {
    const { baseElement } = render(
      <ButtonSubmitting
        submitting={submitting}
        text={text}
        disabled={disabled}
      />
    );
    const btn = baseElement.querySelector(".buttonsubmitting__button");
    expect(btn).toBeInTheDocument();
    expect(btn.disabled).toBeTruthy();
    expect(btn.textContent).toEqual(text);
  });

  it("should render circularbar when 'submitting' is true", async () => {
    submitting = true;
    const { findByRole } = render(
      <ButtonSubmitting submitting={submitting} handler={handlerSpy} />
    );
    const bar = await findByRole("progressbar");

    expect(bar).toBeInTheDocument();
  });

  it("should call handlerSpy on click", async () => {
    const { baseElement } = render(
      <ButtonSubmitting submitting={submitting} handler={handlerSpy} />
    );
    const btn = baseElement.querySelector(".buttonsubmitting__button");
    fireEvent.click(btn);
    expect(handlerSpy).toBeCalled();
  });
});
