import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";

export function Home() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: colors.background,
        minHeight: "100vh",
        color: colors.text,
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: colors.login.background,
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: `0 2px 4px ${colors.shadow}`,
        }}
      >
        <h1>Welcome, {user.name}!</h1>
        <div style={{ marginTop: "2rem" }}>
          <img
            src={user.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />
          <p>Email: {user.email}</p>
          <p>Provider: {user.provider}</p>
          <p>
            Account created: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "2rem",
            padding: "0.5rem 1rem",
            backgroundColor: colors.button,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
