import { SxProps } from "@mui/material";

export const fade: SxProps = {
  animation: `fade 700ms infinite`,
  "@keyframes fade": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
};

export const textStyles: SxProps = {
  whiteSpace: "nowrap",
  // fontSize: { xs: "0.75rem", sm: "1rem" },
};

export const diamondBoxStyle: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  // height: 5,
};

export const diamondStyles: SxProps = {
  color: "primary.main",
};

export const iconButtonStyles: SxProps = {
  ...diamondStyles,
  ml: -1,
};

export const diamondTextStyle: SxProps = {
  mb: 0.33,
  mr: 0.35,
};

export const collectedDiamond: SxProps = {
  mr: 1,
  my: 1,
  color: "customPalette.roseGold",
};
