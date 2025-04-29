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
  isLoading: boolean;
  children: ReactNode;
}

const Loading = ({ children, isLoading }: Props) => {
  if (!isLoading) return children;
  return (
    <Typography
      sx={{
        display: "inline-block",
        background: "linear-gradient(90deg, #ccc 25%, #e0e0e0 50%, #ccc 75%)",
        backgroundSize: "200% 100%",
        animation: `${wave} 1.6s linear 0.5s infinite`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 500,
        mt: 2
      }}
    >
      Locking in your goal...
    </Typography>
  );
};

export default Loading;
