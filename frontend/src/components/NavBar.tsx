import { MainContent } from "./MainContent";
import { useTheme } from "./ThemeProvider";

export function NavBar() {
  const { mode, changeMode } = useTheme();
  const color = mode === "dark" ? "gold" : "red";
  return (
    <>
      <div style={{ color: color }}>This is the navbar</div>
      <button
        onClick={() => {
          changeMode();
        }}
      >
        Toggle Theme
      </button>
      <MainContent></MainContent>
    </>
  );
}
