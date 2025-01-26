import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaClock } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, toggleTheme, isAutomatic, setIsAutomatic } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        display: "flex",
        gap: "0.5rem",
        padding: "0.5rem",
        backgroundColor: theme === "dark" ? "#2d2d2d" : "white",
        borderRadius: "8px",
        boxShadow: `0 2px 4px ${
          theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
        }`,
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={() => setIsAutomatic(true)}
        style={{
          padding: "0.5rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: isAutomatic ? "#4CAF50" : "transparent",
          color: isAutomatic ? "white" : theme === "dark" ? "#b3b3b3" : "#666",
          cursor: "pointer",
        }}
        title="Automatic theme based on time"
      >
        <FaClock size={20} />
      </button>
      <button
        onClick={toggleTheme}
        style={{
          padding: "0.5rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: !isAutomatic ? "#4CAF50" : "transparent",
          color: !isAutomatic ? "white" : theme === "dark" ? "#b3b3b3" : "#666",
          cursor: "pointer",
        }}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  );
}
