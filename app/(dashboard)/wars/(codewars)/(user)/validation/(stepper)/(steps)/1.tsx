import { auth } from "@/auth";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserAvatar from "../(content)/UserAvatar";

const Step1 = async () => {
  const session = await auth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
        px: 2, // Add padding for responsive spacing
        pt: 5,
      }}
    >
      {/* Header Message */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          color: "text.secondary",
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      >
        Welcome to BCFCODE Wars {session?.user?.name || "User"}!
      </Typography>

      {/* Welcome Message */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.6,
          maxWidth: "600px", // Constrain text width for better readability
        }}
      >
        Welcome to BCFCODE Wars, Morteza Bakhshandeh! We’re thrilled to have you
        here! At BCFCODE Wars, we’re connecting you to your Codewars account to
        deliver exciting stats and insights. Ready to begin? Click Next and
        let’s guide you through each step to join our special leaderboard.
      </Typography>

      {/* User Avatar */}
      <UserAvatar session={session} />

      {/* Loading Indicator */}
      {!session && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <CircularProgress color="primary" size={50} />
        </Box>
      )}
    </Box>
  );
};

export default Step1;
