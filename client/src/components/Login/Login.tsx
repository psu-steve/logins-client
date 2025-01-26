import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import AppleSignin from "react-apple-signin-auth";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";
import { Spinner } from "../Spinner/Spinner";

interface AppleResponse {
  accessToken: string;
  refreshToken: string;
}

interface AppleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export function Login() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleSuccess = async (response: any) => {
    try {
      setIsLoading(true);
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_API_URL_PROD
          : process.env.REACT_APP_API_URL_LOCAL;
      sessionStorage.setItem("redirectAfterLogin", "/home");
      window.location.href = `${baseUrl}/auth/google`;
    } catch (err) {
      setError("Failed to login with Google");
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSuccess = (response: any) => {
    try {
      console.log("Facebook login successful");
    } catch (err) {
      console.error("Facebook login error details:", err);
      setError("Failed to login with Facebook. Please try again.");
      console.error("Facebook login error:", err);
    }
  };

  const handleAppleSuccess = (response: any) => {
    try {
      setIsLoading(true);
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_API_URL_PROD
          : process.env.REACT_APP_API_URL_LOCAL;
      window.location.href = `${baseUrl}/auth/apple`;
    } catch (err) {
      console.error("Apple login error:", err);
      setError("Failed to login with Apple. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="main"
      aria-label="Login page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: colors.background,
        color: colors.text,
        transition: "all 0.3s ease",
      }}
    >
      <div
        role="region"
        aria-label="Social login options"
        style={{
          backgroundColor: colors.login.background,
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: `0 2px 4px ${colors.shadow}`,
          maxWidth: "400px",
          width: "100%",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <h1
          style={{
            color: colors.login.headerText,
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Welcome
        </h1>
        <p>Please sign in to continue</p>

        {isLoading && (
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <Spinner
              variant={theme === "dark" ? "light" : "primary"}
              size={20}
            />
            <span style={{ color: colors.text }}>Logging in...</span>
          </div>
        )}

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
            data-testid="google-login"
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError("Google Login Failed");
              console.error("Google login error");
            }}
          />

          <FacebookLogin
            data-testid="facebook-login"
            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
            scope="email,public_profile"
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

          <AppleSignin
            uiType="dark"
            authOptions={{
              clientId: process.env.REACT_APP_APPLE_CLIENT_ID!,
              scope: "email name",
              redirectURI:
                process.env.NODE_ENV === "production"
                  ? "https://social-media-logins.vercel.app/auth/apple/callback"
                  : "http://localhost:8000/auth/apple/callback",
              state: window.crypto.randomUUID(),
              nonce: window.crypto.randomUUID(),
              usePopup: false,
            }}
            onSuccess={(response: AppleResponse) =>
              handleAppleSuccess(response)
            }
            onError={(error: Error) => {
              console.error(error);
              setError("Apple Login Failed");
            }}
            skipScript={false}
            render={(props: AppleButtonProps) => (
              <button
                {...props}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Sign in with Apple
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
