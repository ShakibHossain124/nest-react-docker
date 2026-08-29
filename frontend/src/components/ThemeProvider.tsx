import { createContext, useContext, useState, type ReactNode } from "react";

export interface ThemeContextValue {
  mode: "dark" | "light";
  changeMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("light");

  const changeMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext value={{ mode, changeMode }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  else return context;
}
