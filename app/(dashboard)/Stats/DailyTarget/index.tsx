"use client";

import { useState } from "react";
import TargetPickerSlider from "./Slider";
import Target from "./Target";
import { Box } from "@mui/material";
import Fade from "./Fade";

export default function DailyTarget() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  // console.log(">>>>>>>>>", isHovering);
  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Fade fade={isHovering ? "in" : "out"}>
        <TargetPickerSlider />
      </Fade>
      <Fade fade={isHovering ? "out" : "in"}>
        <Target value={3} />
      </Fade>
    </Box>
  );
}
