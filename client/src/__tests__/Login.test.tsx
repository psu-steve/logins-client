import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../components/Login/Login";
import { AuthProvider } from "../context/AuthContext";

describe("Login Component", () => {
  test("renders social login buttons", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByTestId("google-login")).toBeInTheDocument();
    expect(screen.getByTestId("facebook-login")).toBeInTheDocument();
  });

  test("handles login errors", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Simulate failed login
    fireEvent.click(screen.getByTestId("google-login"));
    expect(screen.getByText(/failed to login/i)).toBeInTheDocument();
  });
});
