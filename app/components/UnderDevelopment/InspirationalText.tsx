import { Fade, Typography } from "@mui/material";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
}

const InspirationalText = ({ session }: Props) => {
  return (
    <Fade in={Boolean(session)} timeout={1000}>
      <Typography
        variant="h6"
        sx={{
          mt: -6.5,
          textAlign: "center",
          maxWidth: 600,
          mb: 3,
          color: "text.secondary",
          fontStyle: "italic",
          opacity: 0.8,
          fontWeight: "500",
          fontSize: "0.7rem",
        }}
      >
        {session
          ? "Let's embark on this exciting journey together!"
          : "Hang tight, we're setting things up!"}
      </Typography>
    </Fade>
  );
};

export default InspirationalText;
