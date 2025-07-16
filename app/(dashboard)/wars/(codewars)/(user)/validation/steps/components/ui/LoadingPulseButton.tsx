"use client";

import { LoadingButton } from "@mui/lab";
import { SxProps, useTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  size?: "large" | "medium" | "small";
  variant?: "contained" | "outlined" | "text";
  color?:
    | "primary"
    | "info"
    | "error"
    | "inherit"
    | "secondary"
    | "success"
    | "warning";
  sx?: SxProps;
  loading: boolean;
  label: string;
  ariaLabel: string;
  disabled?: boolean
  onClick: () => void;
}

const LoadingPulseButton = ({
  color,
  variant,
  size,
  children,
  loading,
  onClick,
  ariaLabel,
  label,
  sx,
  disabled
}: Props) => {
  const theme = useTheme();

  return (
    <LoadingButton
      variant={variant ?? "outlined"}
      color={loading ? "info" : (color ?? "primary")}
      onClick={onClick}
      loading={loading}
      loadingIndicator={children}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      size={size}
      sx={{
        width: "100%",
        px: 3,
        fontWeight: 500,
        transition: "all 0.3s ease",
        animation: loading ? "pulse 1.6s ease-in-out infinite" : "none",
        "@keyframes pulse": {
          "0%": {
            boxShadow: `0 0 0 0 ${theme.palette.primary.main}40`,
          },
          "70%": {
            boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`,
          },
          "100%": {
            boxShadow: `0 0 0 0 ${theme.palette.primary.main}00`,
          },
        },
        "& .MuiLoadingButton-loadingIndicator": {
          display: "flex",
          alignItems: "center",
          gap: 1,
        },
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        ...sx,
      }}
    >
      {label}
    </LoadingButton>
  );
};

export default LoadingPulseButton;
