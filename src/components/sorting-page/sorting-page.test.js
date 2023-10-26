import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";

describe("SortingPage", () => {
  it("should sort an empty array correctly", async () => {
    const { getByText, queryAllByTestId } = render(
      <BrowserRouter>
        <SortingPage arrLength={0} />
      </BrowserRouter>
    );

    const ascendingButton = getByText(/По возрастанию/i);
    const descendingButton = getByText(/По убыванию/i);

    fireEvent.click(ascendingButton);
    expect(queryAllByTestId(/column-[0-9]+/).length === 0).toBe(true);

    fireEvent.click(descendingButton);
    expect(queryAllByTestId(/column-[0-9]+/).length === 0).toBe(true);
  });

  it("should correctly sort an array of one element", async () => {
    const { getByText, queryAllByTestId } = render(
      <BrowserRouter>
        <SortingPage arrLength={1} />
      </BrowserRouter>
    );

    const ascendingButton = getByText(/По возрастанию/i);
    const descendingButton = getByText(/По убыванию/i);

    fireEvent.click(ascendingButton);
    expect(queryAllByTestId(/column-[0-9]+/).length === 1).toBe(true);

    fireEvent.click(descendingButton);
    expect(queryAllByTestId(/column-[0-9]+/).length === 1).toBe(true);
  });

  it("should correctly sort an array of several elements in ascending order", async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <SortingPage arrLength={3} />
      </BrowserRouter>
    );

    let newArr=[];
    for(let i = 0; i < 3; i++){
        const column = getByTestId(`column-${i}`); 
        newArr.push(column.querySelector('p').textContent);
    }
    newArr.sort((a, b) => a - b);
    const ascendingButton = getByText(/По возрастанию/i);

    fireEvent.click(ascendingButton);
    await waitFor(() => {
        for (let i = 0; i < 3; i++) {
            const column = getByTestId(`column-${i}`);
            expect(column).toHaveTextContent(newArr[i]);
        }
      }, { timeout: 6000 });
  });

  it("should correctly sort an array of several elements in descending order", async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <SortingPage arrLength={3} />
      </BrowserRouter>
    );

    let newArr=[];
    for(let i = 0; i < 3; i++){
        const column = getByTestId(`column-${i}`); 
        newArr.push(column.querySelector('p').textContent);
    }
    newArr.sort((a, b) => b - a);
    const descendingButton = getByText(/По убыванию/i);

    fireEvent.click(descendingButton);
    await waitFor(() => {
        for (let i = 0; i < 3; i++) {
            const column = getByTestId(`column-${i}`);
            expect(column).toHaveTextContent(newArr[i]);
        }
      }, { timeout: 6000 });
  });
  jest.setTimeout(30000);
});
