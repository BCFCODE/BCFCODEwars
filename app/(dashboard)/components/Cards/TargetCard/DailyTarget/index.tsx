"use client";

import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Box } from "@mui/material";
import Fade from "./Fade";
import Target from "./Target";
import TargetSelector from "./TargetSelector";

export default function DailyTarget() {
  const { email, label, isHovering, setIsHovering } = useGaugeContext();

  return (
    <Box
      // sx={RelativeCenter}
      onMouseOver={() => setIsHovering({ email, isHovering: true })}
      onMouseLeave={() => setIsHovering({ email, isHovering: false })}
    >
      <Box
        sx={{
          position: "absolute",
          right: 15,
          top: 35,
          zIndex: isHovering ? 1 : 0,
        }}
      >
        <Fade fade={isHovering ? "in" : "out"}>
          <TargetSelector />
        </Fade>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          zIndex: isHovering ? 0 : 1,
        }}
      >
        <Fade fade={isHovering ? "out" : "in"}>
          <Target value={label} />
        </Fade>
      </Box>
    </Box>
  );
}
