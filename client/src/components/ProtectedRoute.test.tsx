import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

const MockProtectedComponent = () => <div>Protected Content</div>;
const MockLoginComponent = () => <div>Login Page</div>;

describe("ProtectedRoute", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );

  it("redirects to login when user is not authenticated", () => {
    render(
      <Routes>
        <Route path="/login" element={<MockLoginComponent />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MockProtectedComponent />
            </ProtectedRoute>
          }
        />
      </Routes>,
      { wrapper }
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
