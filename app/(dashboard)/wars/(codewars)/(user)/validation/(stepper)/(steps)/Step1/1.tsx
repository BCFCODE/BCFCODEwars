import { auth } from "@/auth";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserAvatar from "../../(content)/UserAvatar";

const Step1 = async () => {
  const session = await auth();

  let firstName;
  session && (firstName = session.user.name.split(" ")[0]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
        px: 2,
        pt: 5,
      }}
    >
      {/* User Avatar */}
      <UserAvatar session={session} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "80%",
          // minHeight: "100%", // Full height of the screen
          bgcolor: "background.default", // Neutral background color
          // color: "text.primary", // Primary text color for readability
          p: { xs: 3, sm: 3 }, // Responsive padding (smaller on mobile)
          boxShadow: 3, // Subtle shadow for depth
          borderRadius: 2, // Rounded corners for a modern feel
        }}
      >
        {/* Header Message */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            fontSize: { xs: "1.1rem", sm: "1.35rem" },
          }}
        >
          Welcome to the BCFCODE Community, {session?.user?.name || "User"}!
        </Typography>

        {/* Welcome Message */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            // maxWidth: "80%",
            textAlign: "left",
          }}
        >
          You’re about to embark on the first step of your validation journey.
          In just a few simple steps, we’ll connect you to your Codewars account
          to unlock exclusive access to personalized insights, detailed stats,
          and our vibrant leaderboard. We’re here to guide you every step of the
          way. Ready to get started? Simply click Next, and let’s make your
          coding adventure with BCFCODE even more exciting and rewarding,{" "}
          {firstName}!
        </Typography>
      </Box>

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
