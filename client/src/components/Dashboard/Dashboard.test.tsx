import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { Dashboard } from "./Dashboard";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockUser = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  picture: "https://example.com/photo.jpg",
  provider: "google",
  createdAt: "2024-01-01T00:00:00.000Z",
};

const mockLogout = jest.fn();

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    isAuthenticated: true,
    logout: mockLogout,
  }),
}));

describe("Dashboard", () => {
  it("displays user information", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(`Hello, ${mockUser.name}!`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Provider: ${mockUser.provider}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toHaveAttribute(
      "src",
      mockUser.picture
    );
    expect(screen.getByText("Account ID:")).toBeInTheDocument();
    expect(screen.getByText("Joined:")).toBeInTheDocument();
  });

  it("handles logout", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Logged out successfully");
  });
});
