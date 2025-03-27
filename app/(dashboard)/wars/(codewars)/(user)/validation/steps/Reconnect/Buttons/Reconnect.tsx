"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ReconnectButton = () => {
  const router = useRouter();

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1"); // Navigate to the first step to reconnect
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        mt: 2,
        px: 4,
        py: 1.5,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: 3,
      }}
      onClick={handleReconnect}
    >
      Reconnect Now
    </Button>
  );
};

export default ReconnectButton;
