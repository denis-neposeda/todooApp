import { createTheme } from "@mui/material/styles";
import { type DefaultTheme } from "styled-components";

const baseTheme = {
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
};

export const lightTheme = {
  ...createTheme({
    ...baseTheme,
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
      background: { default: "#fafafa", paper: "#fff" },
    },
  }),
} satisfies DefaultTheme;

export const darkTheme = {
  ...createTheme({
    ...baseTheme,
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      secondary: { main: "#bed893ff" },
      background: { default: "#121212", paper: "#1e1e1e" },
    },
  }),
} satisfies DefaultTheme;
