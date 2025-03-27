import { auth } from "@/auth";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  Typography,
} from "@mui/material";
import Link from "next/link";
interface Props {
  pageName: string;
}

const UnderDevelopment = async ({ pageName }: Props) => {
  const session = await auth();

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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.5rem" }, // Bigger heading for impact on larger screens
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "primary.main", // Use primary color for more prominence
            mb: 1,
            textAlign: "center",
          }}
        >
          This Page Is Under Construction
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.5rem", sm: "0.7rem" },
            maxWidth: 700,
            textAlign: "center",
            color: "text.secondary",
            fontWeight: 400,
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          You are currently viewing **version 1.2.1** of the site. The section
          you&apos;re in is still under construction, but the **Codewars account
          connection** feature is ready! Click the button below to access it.
        </Typography>
        <Link href='/wars'>
          <Button>Go to wars!</Button>
        </Link>
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
          {session
            ? "Let's embark on this exciting journey together!"
            : "Hang tight, we're setting things up!"}
        </Typography>
      </Fade>

      {/* Optional additional content */}
      {/* <AnkiDecks /> */}
    </Box>
  );
};

export default UnderDevelopment;
