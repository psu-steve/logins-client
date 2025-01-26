import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAutomatic: boolean;
  setIsAutomatic: (auto: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isAutomatic, setIsAutomatic] = useState(true);

  useEffect(() => {
    if (!isAutomatic) return;

    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      // Set dark mode between 6 PM (18:00) and 6 AM (6:00)
      setTheme(hours >= 18 || hours < 6 ? "dark" : "light");
    };

    checkTime(); // Initial check
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAutomatic]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setIsAutomatic(false);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isAutomatic, setIsAutomatic }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
