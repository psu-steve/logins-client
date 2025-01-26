import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import DataDeletion from "./components/DataDeletion/DataDeletion";

// This will be your protected dashboard component
const Dashboard = () => <div>Dashboard (Protected Route)</div>;

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    throw new Error("Google Client ID is not defined");
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/data-deletion" element={<DataDeletion />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
