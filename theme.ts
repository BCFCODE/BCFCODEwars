// theme.ts
"use client";

import { createTheme } from "@mui/material/styles";
import { montserrat } from "./app/styles/fonts";

declare module "@mui/material/styles" {
  interface Palette {
    diamondLuxe: {
      roseGleam: string;
      amberLegacy: string;
      royalGold: string;
      champagneMist: string;
      saffronDust: string;
      honeySilk: string;
    };
  }
  interface PaletteOptions {
    diamondLuxe?: {
      roseGleam: string;
      amberLegacy: string;
      royalGold: string;
      champagneMist: string;
      saffronDust: string;
      honeySilk: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    diamondLuxe: {
      roseGleam: "#B76E79",       // ✨ Rose Gold: Romantic luxury
      amberLegacy: "#E1AD52",     // 🌅 Gold Ochre: Warm and grounded
      royalGold: "#FFD700",       // 👑 Classic Gold: Timeless richness
      champagneMist: "#F4D58D",   // 🍾 Champagne Gold: Pale elegance
      saffronDust: "#E8B46F",     // 🌾 Muted Saffron: Vintage tone
      honeySilk: "#F3C178",       // 🍯 Pastel Honey: Gentle warmth
    },
  },
});

export const roseGleam = "diamondLuxe.roseGleam";
export const amberLegacy = "diamondLuxe.amberLegacy";
export const royalGold = "diamondLuxe.royalGold";
export const champagneMist = "diamondLuxe.champagneMist";
export const saffronDust = "diamondLuxe.saffronDust";
export const honeySilk = "diamondLuxe.honeySilk";

export const diamondCollectedColor = roseGleam;
export const diamondNotCollectedColor = "primary.main";

// Optional: semantically styled ranking levels (kyū)
export const KYU_COLORS = [
  "#F2F2F2", // 8 kyū – Pearl Mist
  "#FFE066", // 7 kyū – Golden Dawn
  "#FFB74D", // 6 kyū – Sunset Amber
  "#FF7043", // 5 kyū – Ember Coral
  "#D95F8A", // 4 kyū – Rose Ember
  "#8D5FBF", // 3 kyū – Amethyst Crest
  "#4A7BD0", // 2 kyū – Sapphire Sky
  "#243B55", // 1 kyū – Obsidian Depth
];

export default theme;
