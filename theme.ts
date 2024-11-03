"use client";

import { createTheme } from "@mui/material/styles";
import { montserrat } from "./app/lib/fonts";

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily, // Use Montserrat as the default font family
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

export default theme;
