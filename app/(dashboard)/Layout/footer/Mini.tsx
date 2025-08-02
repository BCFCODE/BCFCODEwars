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
        writingMode: "vertical-lr", // "BCFCODE" stays vertical
        textOrientation: "upright",
        height: "100%", // Ensures full height for proper positioning
      }}
    >
      <span
        style={
          {
            position: "absolute",
            bottom: "17px",
            left: "-5px",
            letterSpacing: "-2px",
            fontSize: "10px",
          } as React.CSSProperties
        }
      >
        BCFCODE
      </span>
      <span
        style={
          {
            position: "absolute",
            bottom: "0px",
            left: "0px",
            writingMode: "horizontal-tb",
            fontSize: "10px",
          } as React.CSSProperties
        }
      >
        © {currentYear}
      </span>
    </Typography>
  );
};

export default Mini;
