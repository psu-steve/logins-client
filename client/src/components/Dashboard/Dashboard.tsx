import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import { Spinner } from "../Spinner/Spinner";
import { useState, useEffect } from "react";
import { getThemeColors } from "../../utils/theme";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    try {
      logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: colors.background,
        borderRadius: "10px",
        boxShadow: `0 2px 4px ${
          theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
        }`,
        color: colors.text,
        transition: "all 0.3s ease",
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          <Spinner size={40} variant={theme === "dark" ? "light" : "primary"} />
          <span style={{ color: colors.text }}>Loading your dashboard...</span>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            {user?.profilePhoto && (
              <img
                src={user.profilePhoto}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: `4px solid ${colors.card}`,
                  boxShadow: `0 2px 4px ${
                    theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
                  }`,
                }}
              />
            )}
            <div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  margin: "0",
                  color: colors.text,
                }}
              >
                Hello, {user?.name || "Guest"}!
              </h1>
              <p
                style={{
                  color: colors.subtext,
                  margin: "0.5rem 0",
                }}
              >
                Welcome to your dashboard
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.card,
              padding: "2rem",
              borderRadius: "8px",
              width: "100%",
              boxShadow: `0 1px 3px ${
                theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
              }`,
            }}
          >
            <h2
              style={{
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Profile Information
            </h2>
            <div
              style={{
                display: "grid",
                gap: "1rem",
              }}
            >
              <InfoRow label="Email" value={user?.email} />
              <InfoRow label="Provider" value={user?.provider || "N/A"} />
              <InfoRow label="Account ID" value={user?.id} />
              <InfoRow
                label="Joined"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()
                }
              />
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#c82333")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc3545")
            }
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "0.5rem 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
          width: "120px",
          color: "#666",
        }}
      >
        {label}:
      </span>
      <span style={{ color: "#333" }}>{value || "N/A"}</span>
    </div>
  );
}

export default Dashboard;
