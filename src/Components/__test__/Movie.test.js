import { screen, render, cleanup, act } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Movie from "../Movie.tsx";
import "@testing-library/jest-dom/extend-expect";

const movie = {
  id: "1234",
  backdrop_path: "backdrop",
  poster_path: "poster",
  original_title: "test",
};

const setup = (movie) => {
  render(
    <BrowserRouter>
      <Movie movie={movie} />
    </BrowserRouter>
  );
};

afterEach(() => cleanup());

describe("Review", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Movie movie={movie} />);
  });
  it("renders link to view movie details", () => {
    setup(movie);

    expect(screen.getByTestId("link")).toBeInTheDocument();
    expect(screen.getByTestId("link").textContent).toBe("test");
  });
  it("renders backdrop_path as movie image if available", () => {
    setup(movie);

    expect(screen.getByTestId("image")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/backdrop"
    );
  });
  it("renders poster_path as movie image if backdrop_path not available", () => {
    setup({
      backdrop_path: "",
      poster_path: "poster",
    });

    expect(screen.getByTestId("image")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster"
    );
  });
  it(`renders 'image coming soon' as movie image if backdrop_path & poster_path not available`, () => {
    setup({
      backdrop_path: "",
      poster_path: "",
    });

    expect(screen.getByTestId("image")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveAttribute(
      "src",
      "https://i0.wp.com/www.dunstableroadrunners.org/wp-content/uploads/2019/04/image-coming-soon.jpg"
    );
  });
  it("renders movie title", () => {
    setup(movie);

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("title").textContent).toEqual("test");
  });
});
