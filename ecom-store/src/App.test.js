import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Ecommerce Store", () => {
  render(<App />);
  const element = screen.getByText("Ecommerce Store");
  expect(element).toBeInTheDocument();
});
