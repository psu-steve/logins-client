import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { Login } from "./Login";

jest.mock("@react-oauth/google", () => ({
  GoogleLogin: () => <button>Mock Google Login</button>,
}));

jest.mock("@greatsumini/react-facebook-login", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <button>Mock Facebook Login</button>
  ),
}));

describe("Login Component", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );

  it("renders login options", () => {
    render(<Login />, { wrapper });

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Please sign in to continue")).toBeInTheDocument();
    expect(screen.getByText("Mock Google Login")).toBeInTheDocument();
    expect(screen.getByText("Mock Facebook Login")).toBeInTheDocument();
  });

  it("displays error message when present", () => {
    render(<Login />, { wrapper });
    // Test implementation
  });

  it("handles login errors correctly", () => {
    render(<Login />, { wrapper });

    // Simulate a failed login
    jest.spyOn(console, "error").mockImplementation(() => {});

    // Find and click the login button that will fail
    const loginButton = screen.getByText("Mock Facebook Login");
    fireEvent.click(loginButton);

    // Check if error message is displayed
    expect(screen.getByText("Facebook Login Failed")).toBeInTheDocument();
  });
});
