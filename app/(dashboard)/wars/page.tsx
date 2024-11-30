import { auth } from "@/auth";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { CodewarsUsernameChecker } from "./codewars/users/validation";
import CustomizedSteppers from "./codewars/users/stepper";

const WarsMainPage = async () => {
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


      <CustomizedSteppers />
  

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
            mt: 3
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
    </Box>
  );
};

export default WarsMainPage;



