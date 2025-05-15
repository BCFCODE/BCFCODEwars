import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

const FadeSX: { in: SxProps; out: SxProps } = {
  in: {
    transition: "all 0.5s ease",
    opacity: 1,
    transform: "scale(1)",
  },
  out: {
    transition: "all 0.5s ease",
    opacity: 0,
    transform: "scale(0.95)",
  },
};

interface Props {
  fade: keyof typeof FadeSX;
  children: ReactNode;
}

const Fade = ({ fade, children }: Props) => {
  return <Box sx={FadeSX[fade]}>{children}</Box>;
};

export default Fade;
