import loading from "@/app/loading";
import { Button, CircularProgress } from "@mui/material";
import React from "react";

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
