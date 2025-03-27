import { Typography } from "@mui/material";
import React from "react";

const Large = () => {
  const currentYear = new Date().getFullYear();
  const footerText = `© ${currentYear} BCFCODE. All rights reserved.`;
  return (
    <Typography
      variant="caption"
      sx={{
        m: 1,
        // ml: 2,
        mb: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {footerText}
    </Typography>
  );
};

export default Large;
