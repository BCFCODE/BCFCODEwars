import { Avatar, Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  pageName: string;
  user: {
    name: string;
    image: string;
  };
}

const Welcome = ({ children, pageName, user }: Props) => {
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
            transition: "font-size 1s ease",
            fontSize: { xs: `${2.5}vw`, sm: `${2}vw`, md: `${1}vw` },
          }}
        >
          Welcome to BCFCODE {pageName}
        </Box>
        <Box
          sx={{
            color: "text.secondary", // Consistent color for user's name
            transition: "font-size 1s ease",
            fontSize: { xs: `${2.5}vw`, sm: `${2}vw`, md: `${1}vw` },
          }}
        >
          {user.name}!
        </Box>
      </Typography>

      {/* User Avatar */}
      {user.image && (
        <Avatar
          alt={user.name}
          src={user.image}
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
      {children}
    </Box>
  );
};

export default Welcome;
