import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";
// Write your tests here

test("sanity", () => {
  expect(true).toBe(false);
});

test("renders AppFunctional without errors", () => {
  render(<AppFunctional />);
  expect("Coordinates: (2,2").toBeInTheDocument;
});

test("renders AppClass without errors", () => {
  render(<AppClass />);
  expect("Coordinates: (2,2").toBeInTheDocument;
});

test("renders the header text welcome to the GRID correctly"),
  (test) => {
    render(<AppFunctional />);
    render(<AppClass />);
    const header = screen.getByText("Welcome to the GRID");
    expect(header).toBeInTheDocument;
    expect(header).toBeInTheDocument(/AppClass/);
    expect(header).toBeInTheDocument(/AppFunctional/);
    expect(header).toBeTruthy();
  };

test("moves in a direction when arrow button is pressed", () => {
  render(<AppFunctional />);
  const left = document.querySelector("#down");

  fireEvent.click(left);
});

test("could successfully submit form", () => {
  render(<AppFunctional />);
  const left = document.querySelector("#down");
  const email = document.querySelector("#email");
  const submit = document.querySelector("#submit");
  fireEvent.click(down);
  fireEvent.change(email, { target: { value: "test@test.com" } });
  fireEvent.click(submit);
});

test("boundary text sucessfully appears if you try to move past boundary", () => {
  render(<AppFunctional />);

  const up = screen.getByTestId("up");
  fireEvent.click(up);
  fireEvent.click(up);
  fireEvent.click(up);
  expect(screen.getByText("You can't go up")).toBeInTheDocument;
});
