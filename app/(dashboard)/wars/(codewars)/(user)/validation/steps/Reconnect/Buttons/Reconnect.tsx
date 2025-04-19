"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const ReconnectButton = () => {
  return (
    <Link href="/wars/validation/steps/1">
      <Button
        variant="outlined"
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
      >
        Reconnect
      </Button>
    </Link>
  );
};

export default ReconnectButton;
