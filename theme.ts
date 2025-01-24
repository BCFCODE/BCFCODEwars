"use client";

import { createTheme } from "@mui/material/styles";
import { montserrat } from "./lib/fonts";

declare module "@mui/material/styles" {
  interface Palette {
    customPalette: {
      roseGold: string;
    };
  }
  interface PaletteOptions {
    customPalette?: {
      roseGold: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily, // Use Montserrat as the default font family
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    customPalette: {
      roseGold: "#B76E79", // A softer, modern take on luxury with a pinkish-gold hue.
    },
  },
});

export default theme;
