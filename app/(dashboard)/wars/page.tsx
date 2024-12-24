// app/(dashboard)/wars/page.tsx

import { auth } from "@/auth";
import clientPromise from "@/lib/MongoDB/database";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  Typography,
} from "@mui/material";
import Link from "next/link";

const WarsPage = async () => {
  const session = await auth();
  const email = session?.user?.email;

  let isConnectedToCodewarsBefore = false;

  if (email) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const user = await db.collection("users").findOne({ email });
      isConnectedToCodewarsBefore = Boolean(user?.codewars);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%", // Full height of the screen
        bgcolor: "background.default", // Neutral background color
        color: "text.primary", // Primary text color for readability
        p: { xs: 3, sm: 5 }, // Responsive padding (smaller on mobile)
        boxShadow: 3, // Subtle shadow for depth
        borderRadius: 2, // Rounded corners for a modern feel
      }}
    >
      {/* Header Message */}
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
            mb: 3,
            boxShadow: 8, // Deep shadow for visual separation
            border: "2px solid", // Adding a border for distinction
            borderColor: "grey.400", // Neutral border color
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)", // Subtle hover effect to add interaction
            },
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

      {/* Under Construction Message */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper", // Neutral background for professional feel
          color: "text.primary", // Maintain text color contrast
          p: { xs: 1, sm: 2 }, // Adjust padding based on screen size
          mb: 4,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 3, // Adding more depth for a more elevated look
        }}
      >
        <Button
          component={Link}
          href="/wars/validation/steps/0"
          variant="outlined"
          color="primary"
          size="large"
          sx={{
            transition: "font-size 0.5s",
            fontSize: {
              xs: "0.7rem",
              sm: "0.9rem",
              md: "1rem",
              lg: "1.2rem",
            },
            mb: 3,
            // textAlign: "center",
          }}
        >
          Connect My Codewars Account
        </Button>
        <Typography
          variant="body1"
          sx={{
            // fontSize: { xs: "0.5rem", sm: "0.7rem" },
            maxWidth: 700,
            textAlign: "center",
            color: "text.secondary", // More subdued color for the description
            fontWeight: 400, // Regular weight for description text
            lineHeight: 1.6, // Improved line height for readability
            opacity: 0.85,
            // mb: 4, // Adequate margin for spacing
          }}
        >
          It looks like this is your first time connecting your Codewars
          profile.
        </Typography>
      </Box>
      {/* Inspirational Text */}
      <Fade in={Boolean(session)} timeout={1000}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            maxWidth: 600,
            mb: 3,
            color: "text.secondary",
            fontStyle: "italic",
            opacity: 0.8,
            fontWeight: "500",
          }}
        >
          Let’s link your account to start climbing the leaderboard and showcase
          your skills!
        </Typography>
      </Fade>

      {/* Optional additional content */}
      {/* <AnkiDecks /> */}
    </Box>
  );
};

export default WarsPage;
