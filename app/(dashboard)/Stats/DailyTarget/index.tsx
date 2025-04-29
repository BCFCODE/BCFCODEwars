"use client";

import { useState } from "react";
import TargetPickerSlider from "./Slider";
import Target from "./Target";
import { Box, SxProps } from "@mui/material";
import Fade from "./Fade";

const RelativeCenter: SxProps = {
  position: "relative",
  backgroundColor: "yellowgreen",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const AbsoluteCenter: SxProps = {
  position: "absolute",
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function DailyTarget() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  // console.log(">>>>>>>>>", isHovering);
  return (
    <Box
      sx={RelativeCenter}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 1 : 0 }}>
        <Fade fade={isHovering ? "in" : "out"}>
          <TargetPickerSlider />
        </Fade>
      </Box>
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 0 : 1 }}>
        <Fade fade={isHovering ? "out" : "in"}>
          <Target value={3} />
        </Fade>
      </Box>
    </Box>
  );
}
