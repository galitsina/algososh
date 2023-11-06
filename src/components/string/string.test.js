import { render, fireEvent, waitFor, queryByTestId } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";

describe("String Component", () => {
  it("should correctly expand a string with an even number of characters", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = getByTestId("input");
    const button = getByTestId("reverse-button");

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);

    await waitFor(() => {
      const circleA = getByTestId('circle-0'); 
      const circleB = getByTestId('circle-1');
      const circleC = getByTestId('circle-2');
      const circleD = getByTestId('circle-3');

      expect(circleA).toHaveTextContent("d");
      expect(circleB).toHaveTextContent("c");
      expect(circleC).toHaveTextContent("b");
      expect(circleD).toHaveTextContent("a");
    }, { timeout: 5000 }); // 5 seconds are calculated to be enough time for the animation to finish
  });

  it("should correctly expand a string with an odd number of characters", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = getByTestId("input");
    const button = getByTestId("reverse-button");

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(button);

    await waitFor(() => {
      const circleA = getByTestId('circle-0'); 
      const circleB = getByTestId('circle-1');
      const circleC = getByTestId('circle-2');

      expect(circleA).toHaveTextContent("c");
      expect(circleB).toHaveTextContent("b");
      expect(circleC).toHaveTextContent("a");
    }, { timeout: 3000 }); // 3 seconds are calculated to be enough time for the animation to finish
  });

  it("should correctly expand a single character string", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = getByTestId("input");
    const button = getByTestId("reverse-button");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.click(button);

    await waitFor(() => {
      const circleA = getByTestId('circle-0'); 

      expect(circleA).toHaveTextContent("a");
    }, { timeout: 1000 }); // 1 seconds are calculated to be enough time for the animation to finish
  });

  it("should correctly expand an empty string", async () => {
    const { getByTestId, queryAllByTestId } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = getByTestId("input");
    const button = getByTestId("reverse-button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
   
    expect(queryAllByTestId( /circle-[0-9]+/ ).length === 0).toBe(true);
  });
});
