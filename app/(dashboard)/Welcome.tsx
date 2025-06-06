"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import useCurrentUserQuery from "../context/hooks/useCurrentUserQuery";

interface Props extends PropsWithChildren {
  pageName: string;
  user: {
    name: string;
    image: string;
    email: string;
  };
}

const Welcome = ({ children, pageName, user }: Props) => {
  const { isLoading } = useCurrentUserQuery(user.email);

  if (isLoading) return <Box>{children}</Box>;

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
        marginTop: 2.5
      }}
    >
      {/* Header Message */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "600",
          color: "text.primary", // Professional text color
          textAlign: "center",
          mb: 1,
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
            boxShadow: 8, // Deep shadow for visual separation
            border: "2px solid", // Adding a border for distinction
            borderColor: "grey.400", // Neutral border color
            transition: "transform 0.3s ease-in-out, margin 1s ease, width 2s ease, height 2s ease",
            "&:hover": {
              transform: "scale(1.1)", // Subtle hover effect to add interaction
            },
            "@media (min-width:1px)": {
              width: 80,
              height: 80,
              marginBottom: -10,
            },
            "@media (min-width:380px)": {
              width: 80,
              height: 80,
              marginBottom: -9,
            },
            "@media (min-width:480px)": {
              width: 100,
              height: 100,
              marginBottom: -8,
            },
            "@media (min-width:760px)": {
              width: 120,
              height: 120,
              marginBottom: -7,
            },
            "@media (min-width:800px)": {
              width: 110,
              height: 110,
              marginBottom: -5,
            },
        
          }}
        />
      )}
      {children}
    </Box>
  );
};

export default Welcome;
