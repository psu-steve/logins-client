import { render } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it("renders with default props", () => {
    const { container } = render(<Spinner />, { wrapper });
    const spinner = container.firstChild;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: "30px", height: "30px" });
  });

  it("renders with custom size", () => {
    const { container } = render(<Spinner size={50} />, { wrapper });
    const spinner = container.firstChild;
    expect(spinner).toHaveStyle({ width: "50px", height: "50px" });
  });

  it("renders with different variants", () => {
    const { container: primary } = render(<Spinner variant="primary" />, {
      wrapper,
    });
    const { container: secondary } = render(<Spinner variant="secondary" />, {
      wrapper,
    });
    const { container: light } = render(<Spinner variant="light" />, {
      wrapper,
    });

    expect(primary.firstChild).toBeInTheDocument();
    expect(secondary.firstChild).toBeInTheDocument();
    expect(light.firstChild).toBeInTheDocument();
  });
});
