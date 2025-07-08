"use client";

import { Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import LoadingPulseButton from "../../components/ui/LoadingPulseButton";

const ReconnectButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link href="/wars/validation/steps/1">
      <LoadingPulseButton
        label="Reconnect"
        ariaLabel="Reconnect to codewars button"
        loading={isLoading}
        onClick={() => setIsLoading(true)}
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
        <Typography
          variant="button" // same as button text style
          sx={{
            whiteSpace: "nowrap", // ❗prevent wrapping
            overflow: "hidden", // just in case
            textOverflow: "ellipsis", // truncate if too long
          }}
        >
          Reconnect
        </Typography>
      </LoadingPulseButton>
    </Link>
  );
};

export default ReconnectButton;
