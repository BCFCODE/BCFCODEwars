"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingPulseButton from "../../components/ui/LoadingPulseButton";

interface Props {
  disabled: boolean;
}

const ReconnectButton = ({ disabled }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <LoadingPulseButton
      disabled={disabled}
      color="error"
      label="Reconnect"
      ariaLabel="Reconnect to codewars button"
      loading={isLoading}
      onClick={() => {
        setIsLoading(true);
        router.push("/wars/validation/steps/1");
      }}
      sx={{
        mt: 2,
        px: 4,
        py: 1.5,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: 3,
        width: "auto",
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
  );
};

export default ReconnectButton;
