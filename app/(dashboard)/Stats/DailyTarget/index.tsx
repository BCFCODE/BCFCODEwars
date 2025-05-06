"use client";

import { Box, SxProps } from "@mui/material";
import Fade from "./Fade";
import Loading from "../../leaderboard/UsersTable/Pagination/Loading";
import Target from "./Target";
import TargetSelector from "./TargetSelector";
import useTargetStore from "./useTargetStore";

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
  const { isLoading, target, isHovering, setIsHovering } = useTargetStore();

  return (
    <Box
      sx={RelativeCenter}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 1 : 0 }}>
        <Fade fade={isHovering ? "in" : "out"}>
          <TargetSelector />
        </Fade>
      </Box>
      <Box sx={{ ...AbsoluteCenter, zIndex: isHovering ? 0 : 1 }}>
        <Fade fade={isHovering ? "out" : "in"}>
          <Target value={target} />
        </Fade>
      </Box>
    </Box>
  );
}
