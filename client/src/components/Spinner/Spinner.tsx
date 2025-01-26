import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";

interface SpinnerProps {
  size?: number;
  variant?: "primary" | "secondary" | "light";
}

export function Spinner({ size = 30, variant = "primary" }: SpinnerProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const getSpinnerColor = () => {
    switch (variant) {
      case "primary":
        return colors.spinner.primary;
      case "secondary":
        return colors.spinner.secondary;
      case "light":
        return colors.spinner.light;
      default:
        return colors.spinner.primary;
    }
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          border: `3px solid ${colors.spinner.track}`,
          borderTop: `3px solid ${getSpinnerColor()}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
