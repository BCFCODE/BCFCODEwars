import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  loading: boolean;
  username: string;
  validateUsername: () => void;
}

const ValidationButton = ({ loading, username, validateUsername }: Props) => {
  const theme = useTheme();

  return (
    <LoadingButton
      variant="outlined"
      color={loading ? "info" : "primary"}
      onClick={validateUsername}
      loading={loading}
      loadingIndicator={
        <Typography
          variant="button" // same as button text style
          sx={{
            whiteSpace: "nowrap", // ❗prevent wrapping
            overflow: "hidden",   // just in case
            textOverflow: "ellipsis", // truncate if too long
          }}
        >
          Validating...{/*  {username} */}
        </Typography>
      }
      disabled={loading}
      aria-label={`Validate ${username}`}
      sx={{
        width: '100%',
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
      Validate username
    </LoadingButton>
  );
};

export default ValidationButton;
