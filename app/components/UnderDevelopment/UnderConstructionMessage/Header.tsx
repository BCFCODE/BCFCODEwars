import { Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
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
  );
};

export default Header;
