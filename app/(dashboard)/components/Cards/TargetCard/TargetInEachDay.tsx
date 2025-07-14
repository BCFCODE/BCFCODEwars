"use client";

import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { keyframes } from "@emotion/react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { Box, Fade } from "@mui/material";
import CountUp from "react-countup";

const search = keyframes`
  0%, 100% { transform: translateX(0); opacity: 0.9; }
  50% { transform: translateX(-15px); opacity: 1; }
`;

const TargetInEachDay = () => {
  const { label, isHovering } = useGaugeContext();

  return (
    <Box
      key={label}
      sx={{
        color: "text.primary",
        fontSize: "2.25rem",
        width: "6ch",
        height: "3.2rem", // or use 44px
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Fade in={!isHovering} timeout={500} unmountOnExit>
        <Box>
          <CountUp
            end={label}
            duration={0.5}
            suffix="/Day"
            preserveValue
            useEasing
          />
        </Box>
      </Fade>

      {isHovering && (
        <Box
          component="span"
          sx={{
            animation: `${search} 2s ease-in-out infinite`,
            color: "warning.main",
            position: "absolute",
            top: 5,
            left: 25,
          }}
        >
          <SearchSharpIcon sx={{ fontSize: 45 }} />
        </Box>
      )}
    </Box>
  );
};

export default TargetInEachDay;
