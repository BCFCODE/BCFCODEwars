import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import { Typography, Button } from "@mui/material";
import React from "react";

interface Props {
  onReconnect: () => void;
  onRetry: () => void;
}

const Error = ({ onReconnect, onRetry }: Props) => {
  return (
    <ErrorUI>
      <Typography variant="body1" color="text.secondary">
        Oops, we couldn’t fetch your challenge list from Codewars. If you’ve
        changed your username on Codewars, click &apos;Reconnect&apos;
        Otherwise, it’s likely a network issue—please check your connection and
        try again!
      </Typography>
      <ErrorButtonContainer>
        <Button variant="outlined" color="primary" onClick={onRetry}>
          Try Again
        </Button>
        <Button variant="contained" color="secondary" onClick={onReconnect}>
          Reconnect
        </Button>
      </ErrorButtonContainer>
    </ErrorUI>
  );
};

export default Error;
