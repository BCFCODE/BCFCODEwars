"use client";

import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Box, SxProps } from "@mui/material";
import Fade from "./Fade";
import Target from "./Target";
import TargetSelector from "./TargetSelector";

// const RelativeCenter: SxProps = {
//   // position: "relative",
//   // position: "absolute",
//   // display: "flex",
//   // alignItems: "center",
//   // justifyContent: "center",
// };

const AbsoluteSXs: SxProps = {
  // backgroundColor: 'yellowgreen',
  position: "absolute",
  right: 10,
  top: 7,
  // top: {
  //   xs: 0,
  //   sm: "initial",
  // },
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
};

export default function DailyTarget() {
  const { email, label, isHovering, setIsHovering } = useGaugeContext();

  return (
    <Box
      // sx={RelativeCenter}
      onMouseOver={() => setIsHovering({ email, isHovering: true })}
      onMouseLeave={() => setIsHovering({ email, isHovering: false })}
    >
      <Box sx={{ ...AbsoluteSXs, top: 35, zIndex: isHovering ? 1 : 0 }}>
        <Fade fade={isHovering ? "in" : "out"}>
          <TargetSelector />
        </Fade>
      </Box>
      <Box sx={{ ...AbsoluteSXs, zIndex: isHovering ? 0 : 1 }}>
        <Fade fade={isHovering ? "out" : "in"}>
          <Target value={label} />
        </Fade>
      </Box>
    </Box>
  );
}
