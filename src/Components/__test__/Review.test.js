import {
  screen,
  render,
  cleanup,
  act,
} from "@testing-library/react";
import React from "react";
import { createRoot } from "react-dom/client";
import Review from "../Review.tsx";
import "@testing-library/jest-dom/extend-expect";

const review = {
  author: "test",
  created_at: "2018-10-18",
  updated_at: "2022-12-12",
  author_details: {
    avatar_path: "",
  },
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
};

const setup = (review) => {
  render(<Review review={review} />);
};

afterEach(() => cleanup());

describe("Review", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Review review={review} />);
  });
  it("renders blank profile image if author image is not available", () => {
    act(() => {
      setup({
        author_details: {
          avatar_path: "",
        },
      });
    });
    const image = screen.getByTestId("review-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png"
    );
  });
  it("renders author avatar if it is available", () => {
    act(() => {
      setup({
        author_details: {
          avatar_path: "test",
        },
      });
    });
    const image = screen.getByTestId("review-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w400/test"
    );
  });
  it("renders content of the review", () => {
    act(() => {
      setup(review);
    });
    const content = screen.getByTestId("review-content");
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`);
  });
  it("renders date of creation of the review", () => {
    act(() => {
      setup(review);
    });
    const content = screen.getByTestId("review-created");
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe(`Thu Oct 18 2018`);
  });
  it(`renders date of update of the review only if there was an update with 'Edited' in front of the date`, () => {
    act(() => {
      setup(review);
    });
    const content = screen.getByTestId("review-updated");
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe(`Edited Mon Dec 12 2022`);
    cleanup();
    act(() => {
      setup({
        updated_at: null
      })
    })
    expect(content).not.toBeInTheDocument();
  });
});
