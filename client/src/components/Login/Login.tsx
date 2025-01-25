import { useState } from "react";
import { GoogleLogin } from "./GoogleLogin";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (response: any) => {
    try {
      // Here you would typically send the token to your backend
      // and get user data in return
      const userData = {
        id: response.sub || response.id,
        email: response.email,
        name: response.name,
        picture: response.picture,
      };

      login(userData);
    } catch (err) {
      setError("Failed to login. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Welcome</h1>
      <p>Please sign in to continue</p>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.loginButtons}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => setError("Google login failed")}
        />
        {/* Add other social login buttons here */}
      </div>
    </div>
  );
}
