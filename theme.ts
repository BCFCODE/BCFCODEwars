"use client";

import { createTheme } from "@mui/material/styles";
import { montserrat } from "./lib/fonts";

declare module "@mui/material/styles" {
  interface Palette {
    customPalette: {
      roseGold: string;
      goldOchre: string;
    };
  }
  interface PaletteOptions {
    customPalette?: {
      roseGold: string;
      goldOchre: string;
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
      goldOchre: "#E1AD52", // A warm, muted golden-yellow that pairs luxuriously with rose gold.
    /* 
      Elegant & Soft Yellow Tones (Best Matches with Rose Gold)
        Gold Ochre (#E1AD52) – A warm, muted golden-yellow that pairs luxuriously with rose gold.
        Amber Glow (#FFC76D) – A soft amber shade that gives a warning feel without being harsh.
        Desaturated Mustard (#D4A24C) – A refined, slightly earthy yellow that blends well.
      Subtle & Faded Approaches (For a Softer Look)
        Champagne Gold (#F4D58D) – A pale, champagne-like gold that softly fades with rose gold.
        Muted Saffron (#E8B46F) – A golden tone with a slight vintage luxury appeal.
        Pastel Honey (#F3C178) – A softer, modern yellow that keeps a warm, premium aesthetic.
    */
    },
  },
});

export default theme;
