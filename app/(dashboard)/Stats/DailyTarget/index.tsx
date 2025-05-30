"use client";

import { Box, SxProps } from "@mui/material";
import Fade from "./Fade";
import Target from "./Target";
import TargetSelector from "./TargetSelector";
import useTargetStore from "./useTargetStore";
import useGaugeContext from "@/app/context/hooks/useGaugeContext";

const RelativeCenter: SxProps = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const AbsoluteCenter: SxProps = {
  position: "absolute",
  top: {
    xs: 0,
    sm: "initial",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function DailyTarget() {
  const { email } = useGaugeContext();
  const label = useTargetStore((state) => state.label[email]);
  const isHovering = useTargetStore((state) => state.isHovering[email]);
  const setIsHovering = useTargetStore((state) => state.setIsHovering);

  return (
    <Box
      sx={RelativeCenter}
      onMouseOver={() => setIsHovering({ email, isHovering: true })}
      onMouseLeave={() => setIsHovering({ email, isHovering: false })}
    >
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 1 : 0 }}>
        <Fade fade={isHovering ? "in" : "out"}>
          <TargetSelector />
        </Fade>
      </Box>
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 0 : 1 }}>
        <Fade fade={isHovering ? "out" : "in"}>
          <Target value={label} />
        </Fade>
      </Box>
    </Box>
  );
}
