import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  it("should correctly render the button with text", () => {
    const button = render(<Button text="test" />);
    expect(button).toMatchSnapshot();
  });

  it("should correctly render the button without text", () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it("should correctly render the disabled button", () => {
    const button = render(<Button disabled={true} />);
    expect(button).toMatchSnapshot();
  });

  it("should correctly render the button with loader", () => {
    const button = render(<Button isLoader={true} />);
    expect(button).toMatchSnapshot();
  });

  it("should correctly call the callback when the button is clicked", () => {
    const callBack = jest.fn();
    const { getByText } = render(<Button text="test" onClick={callBack} />);
    const button = getByText("test");
    fireEvent.click(button);
    expect(callBack).toHaveBeenCalled();
  });
});
