import { SxProps } from "@mui/material";

export const diamondCollectedColor = "customPalette.roseGold";
export const diamondNotCollectedColor = "primary.main";

export const diamondStyles: SxProps = {
  marginTop: 0.4,
  color: diamondNotCollectedColor,
};

export const fade = (error: boolean): SxProps => ({
  ...diamondStyles,
  color: error ? "customPalette.goldOchre" : "initial",
  animation: `fade 700ms infinite`,
  "@keyframes fade": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
});

export const textStyles: SxProps = {
  whiteSpace: "nowrap",
  // fontSize: { xs: "0.75rem", sm: "0.5rem" },
};

export const codewarsCellStyles: SxProps = {
  ...textStyles,
  // p: 1,
};

export const diamondBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: 5,
};

export const counterStyles: SxProps = {
  mr: 0.35,
};

export const collectedDiamondStyles: SxProps = {
  ...diamondStyles,
  mr: 1,
  color: diamondCollectedColor, // "#B76E79" A softer, modern take on luxury with a pinkish-gold hue.
};

export const iconButtonStyles: SxProps = {
  marginLeft: -1,
};
