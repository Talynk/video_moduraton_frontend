import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders video moderation system", () => {
  render(<App />);
  const titleElement = screen.getByText(/Video Moderation System/i);
  expect(titleElement).toBeInTheDocument();
});
