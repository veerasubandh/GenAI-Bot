export const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("finai_theme");
  if (stored === "dark" || stored === "light") return stored;
  // default: light
  return "light";
};

export const applyThemeToDocument = (theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};
