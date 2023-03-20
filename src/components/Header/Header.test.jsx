import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Header from "./Header";

describe("Header component", () => {
  it("should render the correct title", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Calender")).toBeInTheDocument();
  });

  it("should call the previous month handler when the previous button is clicked", () => {
    const { getByTestId } = render(<Header />);
    const prevButton = getByTestId("prev-button");
    expect(prevButton).toBeInTheDocument();
  });

  it("should call the next month handler when the next button is clicked", () => {
    const { getByTestId } = render(<Header />);
    const nextButton = getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
  });

  it("should call the reset handler when the today button is clicked", () => {
    const { getByText } = render(<Header />);
    const todayButton = getByText("Today");
    expect(todayButton).toBeInTheDocument();
  });
});
