import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";

export function Home() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigate = useNavigate();
  const [sunset, setSunset] = useState<string | null>(null);

  const fetchSunsetTime = useCallback(async (lat: number, lon: number) => {
    console.log("Fetching sunset time for lat:", lat, "lon:", lon);

    try {
      const response = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Weather Data:", data);

      if (!data.sunset) {
        throw new Error("Sunset time not found in response");
      }

      console.log("Sunset time from API:", data.sunset);
      return data.sunset;
    } catch (error) {
      console.error("Error fetching sunset time:", error);
      return null;
    }
  }, []);

  const handleFetchSunset = async () => {
    const lat = 40.7128; // New York Latitude
    const lon = -74.006; // New York Longitude
    const sunsetTime = await fetchSunsetTime(lat, lon);
    setSunset(sunsetTime);
  };

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
        display: "flex",
        justifyContent: "center",
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
          display: "flex",
          flexDirection: "column",
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
          <p>Account created: {new Date(user.createdAt).toLocaleDateString()}</p>
          <p>Sunset: {sunset || "Click the button to check sunset time"}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchSunset}
          >
            Check Sunset Time
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/events")}
          >
            View Eventbrite Events
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/passkeys")}
          >
            Manage Passkeys
          </Button>
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
    </div>
  );
}

export default Home;
