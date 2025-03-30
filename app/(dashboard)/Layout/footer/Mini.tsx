import React from "react";
import Typography from "@mui/material/Typography";

const Mini = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography
      variant="caption"
      sx={{
        m: 1,
        mb: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        // fontSize: "0.7em",
        writingMode: "vertical-lr", // "BCFCODE" stays vertical
        textOrientation: "upright",
        height: "100%", // Ensures full height for proper positioning
      }}
    >
      <span
        style={{
          position: "absolute",
          bottom: 20,
          left: -6,
          letterSpacing: -3.5,
          fontSize: "0.95em",
        }}
      >
        BCFCODE
      </span>{" "}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          writingMode: "horizontal-tb", // Keeps the year horizontal
          // fontSize: "1.1em",
        }}
      >
        © {currentYear}
      </span>
    </Typography>
  );
};

export default Mini;
