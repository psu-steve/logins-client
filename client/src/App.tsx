import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Login } from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import DataDeletion from "./components/DataDeletion/DataDeletion";
import { Home } from "./components/Home/Home";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  console.log("Protected Route - isAuthenticated:", isAuthenticated); // Debug log

  // Don't redirect while checking auth status
  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    // Redirect to /login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/data-deletion" element={<DataDeletion />} />
            </Routes>
            <ToastContainer position="top-right" />
            <ThemeToggle />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
