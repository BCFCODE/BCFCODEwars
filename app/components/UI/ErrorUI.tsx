import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";

interface ErrorUIProps {
  message: string;
  onRetry: () => void;
}

const ErrorUI = ({ message, onRetry }: ErrorUIProps) => {
  const router = useRouter();

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 2,
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 48 }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Button variant="outlined" color="primary" onClick={onRetry}>
          Try Again
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReconnect}>
          Reconnect
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorUI;
