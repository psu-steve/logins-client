import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSuccess = async (response: any) => {
    try {
      // Here you would typically send the token to your backend
      const userData = {
        id: response.sub || response.id,
        email: response.email,
        name: response.name,
        picture: response.picture,
      };
      login(userData);
    } catch (err) {
      setError("Failed to login with Google. Please try again.");
      console.error("Google login error:", err);
    }
  };

  const handleFacebookSuccess = (response: any) => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_API_URL_PROD
          : process.env.REACT_APP_API_URL_LOCAL;
      window.location.href = `${apiUrl}/auth/facebook`;
    } catch (err) {
      setError("Failed to login with Facebook. Please try again.");
      console.error("Facebook login error:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1>Welcome</h1>
      <p>Please sign in to continue</p>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Login Failed")}
        />

        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
          onSuccess={handleFacebookSuccess}
          onFail={(error: any) => {
            setError("Facebook Login Failed");
            console.error(error);
          }}
          style={{
            backgroundColor: "#4267b2",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login with Facebook
        </FacebookLogin>
      </div>
    </div>
  );
}

export default Login;
