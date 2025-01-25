import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Login: React.FC = () => {
  const handleGoogleSuccess = (response: any) => {
    // Handle Google login response
    console.log("Google login success:", response);
  };

  const handleFacebookSuccess = (response: any) => {
    // Handle Facebook login response
    console.log("Facebook login success:", response);
  };

  return (
    <div className="login-container">
      <h2>Login with Social Media</h2>

      <div className="social-buttons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
        />

        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          onSuccess={handleFacebookSuccess}
          onFail={(error) => console.log("Facebook Login Failed:", error)}
        />
      </div>
    </div>
  );
};

export default Login;
