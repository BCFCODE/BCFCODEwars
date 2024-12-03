"use client";

import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { CodewarsUsernameChecker } from "./codewars/users/validation/Stepper/S2/input";

const Wars = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* Header Message */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          color: "text.primary", // Professional text color
          textAlign: "center",
          mb: 2,
          letterSpacing: 1.5,
          fontSize: { xs: "0.6rem", sm: "h5.fontSize" },
          // fontSize: { xs: "h6.fontSize", sm: "h5.fontSize" }, // Responsive font size
          lineHeight: 1.4,
          transition: "color 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            color: "text.secondary", // More subtle tone for the title
          }}
        >
          Welcome to BCFCODE Wars
        </Box>
        <Box
          sx={{
            color: "text.secondary", // Consistent color for user's name
          }}
        >
          {session?.user?.name || "User"}!
        </Box>
      </Typography>

      {/* User Avatar */}
      {session?.user?.image && (
        <Avatar
          alt={session?.user?.name || ""}
          src={session?.user?.image}
          sx={{
            width: { xs: 100, sm: 120 }, // Responsive avatar size
            height: { xs: 100, sm: 120 },
            // mb: 3,
            boxShadow: 8, // Deep shadow for visual separation
            border: "2px solid", // Adding a border for distinction
            borderColor: "grey.400", // Neutral border color
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)", // Subtle hover effect to add interaction
            },
            mt: 3,
          }}
        />
      )}

      {/* Loading Indicator if no session is found */}
      {!session && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      )}
      <CodewarsUsernameChecker />
    </>
  );
};

export default Wars;
