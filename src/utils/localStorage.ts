const THEME_KEY = "themeMode";

export const saveTheme = (isDark: boolean) => {
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
};

export const loadTheme = (): boolean => {
  const mode = localStorage.getItem(THEME_KEY);
  return mode === "dark";
};
