import { Button, CircularProgress } from "@mui/material";

interface Props {
  loading: boolean;
  username: string;
  validateUsername: () => void;
}

const ValidationButton = ({ loading, username, validateUsername }: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => validateUsername()}
      disabled={loading || !username.trim()}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        "Validate Username"
      )}
    </Button>
  );
};

export default ValidationButton;
