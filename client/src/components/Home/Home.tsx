import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";

export function Home() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigate = useNavigate();

  const [userSunset, setUserSunset] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userTimezoneAbbr, setUserTimezoneAbbr] = useState<string | null>(null);

  const [stateCollegeSunset, setStateCollegeSunset] = useState<string | null>(null);
  const [stateCollegeCity, setStateCollegeCity] = useState<string | null>(null);
  const [stateCollegeTimezoneAbbr, setStateCollegeTimezoneAbbr] = useState<string | null>(null);

  const handleFetchSunset = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("User granted location access:", lat, lon);

        try {
          const response = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          const data = await response.json();
          console.log("User Location Weather Data:", data);
          setUserSunset(data.sunset);
          setUserCity(data.city);
          setUserTimezoneAbbr(data.timezoneAbbr);
        } catch (error) {
          console.error("Error fetching sunset time:", error);
          setUserSunset("Error retrieving sunset time");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Please allow location access to get sunset time.");
      }
    );
  };

  // Fetch sunset time for PSU
  const handleFetchStateCollegeSunset = async () => {
    try {
      const lat = 40.7934;
      const lon = -77.8600;
      const response = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log("State College Weather Data:", data);
      setStateCollegeSunset(data.sunset);
      setStateCollegeCity(data.city);
      setStateCollegeTimezoneAbbr(data.timezoneAbbr);
    } catch (error) {
      console.error("Error fetching State College sunset time:", error);
      setStateCollegeSunset("Error retrieving sunset time");
    }
  };

  // Automatically fetch the sunset for State College, PA when the component mounts
  useEffect(() => {
    handleFetchStateCollegeSunset();
  }, []);

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
            <p>
              Sunset at PSU: {stateCollegeSunset} EST
            </p>
          {userSunset && userCity && (
            <p>
              Sunset for {userCity}: {userSunset}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleFetchSunset}>
            Check Sunset for My Location
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/events")}>
            View Eventbrite Events
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/passkeys")}>
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
