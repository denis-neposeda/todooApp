import { type FC, useState } from "react";

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { App } from "./App";
import { darkTheme, lightTheme } from "./theme";
import { loadTheme, saveTheme } from "./utils";

export const RootApp: FC = () => {
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
