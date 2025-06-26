import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  loading: boolean;
  label: string;
  ariaLabel: string;
  onClick: () => void;
}

const LoadingPulseButton = ({
  children,
  loading,
  onClick,
  ariaLabel,
  label,
}: Props) => {
  const theme = useTheme();

  return (
    <LoadingButton
      variant="outlined"
      color={loading ? "info" : "primary"}
      onClick={onClick}
      loading={loading}
      loadingIndicator={children}
      disabled={loading}
      aria-label={ariaLabel}
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
      }}
    >
      {label}
    </LoadingButton>
  );
};

export default LoadingPulseButton;
