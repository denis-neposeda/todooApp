import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import App from "./App";
import { lightTheme, darkTheme } from "./theme";
import { saveTheme, loadTheme } from "./utils/localStorage";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { BrowserRouter } from "react-router-dom";

const RootApp = () => {
  const [isDark, setIsDark] = useState<boolean>(loadTheme);
  const currentTheme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      saveTheme(next);
      return next;
    });
  };

  return (
    <MuiThemeProvider theme={currentTheme}>
      <StyledThemeProvider theme={currentTheme}>
        <CssBaseline />
        <App toggleTheme={toggleTheme} isDark={isDark} />
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

const store = setupStore();

const root = document.getElementById("root");
if (root)
  createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
        <StrictMode>
          <RootApp />
        </StrictMode>
      </Provider>
    </BrowserRouter>
  );
