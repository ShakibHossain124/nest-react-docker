import { useTheme } from "./ThemeProvider";

export function MainContent() {
  const { mode, changeMode } = useTheme();
  const color = mode === "dark" ? "gold" : "red";

  return (
    <div style={{ color: color }}>
      This is the main content{" "}
      <button
        onClick={() => {
          changeMode();
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
