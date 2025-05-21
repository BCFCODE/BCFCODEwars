import { Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import React, { ReactNode } from "react";

const wave = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5
  }
  100% {
    opacity: 1;
  }
`;

interface Props {
  message: string;
}

const Loading = ({ message }: Props) => {
  return (
    <Typography
      sx={{
        display: "flex", // enable flex
        alignItems: "center", // vertical centering
        justifyContent: "center", // horizontal centering (optional)
        background: "linear-gradient(90deg, #ccc 25%, #e0e0e0 50%, #ccc 75%)",
        backgroundSize: "200% 100%",
        animation: `${wave} 500ms linear infinite`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 500,
        textAlign: "center",
        height: 50,
      }}
    >
      {message}
    </Typography>
  );
};

export default Loading;
