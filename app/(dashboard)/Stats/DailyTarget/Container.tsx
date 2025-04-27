import { Box } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface Props {
  slider: ReactNode;
}

const Container = ({ slider }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  console.log(">>>>>>>>>", isHovering);
  return (
    <Box
      sx={{
        // width: "100%",
        opacity: isHovering ? 1 : 0,
        transform: isHovering ? "scale(1)" : "scale(0.95)",
        transition: "all 0.5s ease",
        // position: "absolute",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {slider}
    </Box>
  );
};

export default Container;
