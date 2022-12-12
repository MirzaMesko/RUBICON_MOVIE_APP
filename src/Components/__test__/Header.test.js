import {
  screen,
  render,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header.tsx";
import "@testing-library/jest-dom/extend-expect";

const setup = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

afterEach(() => cleanup());

describe("Review", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Header />);
  });
  it(`renders 'RUBICON MOVIE APP' as title of the header`, () => {
    setup();

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("RUBICON MOVIE APP");
  });
  it(`renders links to Movies and TV Shows`, () => {
    setup();

    const moviesLink = screen.getByTestId("link-to-movies");
    expect(moviesLink).toBeInTheDocument();
    expect(moviesLink.textContent).toBe("Movies");

    const tvLink = screen.getByTestId("link-to-tv");
    expect(tvLink).toBeInTheDocument();
    expect(tvLink.textContent).toBe("TV Shows");
  });
});
