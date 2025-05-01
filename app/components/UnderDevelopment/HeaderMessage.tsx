import { Typography, Box } from "@mui/material";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
  pageName: string;
}

const HeaderMessage = ({ session, pageName }: Props) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "600",
        color: "text.primary", // Professional text color
        textAlign: "center",
        mb: 3,
        letterSpacing: 1.5,
        fontSize: { xs: "h6.fontSize", sm: "h5.fontSize" }, // Responsive font size
        lineHeight: 1.4,
        transition: "color 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          color: "text.secondary", // More subtle tone for the title
        }}
      >
        Welcome to BCFCODE {pageName}
      </Box>
      <Box
        sx={{
          color: "text.secondary", // Consistent color for user's name
        }}
      >
        {session?.user?.name || "User"}!
      </Box>
    </Typography>
  );
};

export default HeaderMessage;
