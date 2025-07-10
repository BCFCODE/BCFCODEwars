import { Box, BoxProps } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { ReactNode } from "react";

// Define the soft pulse animation around the child
const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Wrapper = styled(Box)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const PulseEffect = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "15%",
  // borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  animation: `${pulseRing} 1.6s infinite ease-out`,
  zIndex: 0,
  filter: "blur(6px)",
}));

const Content = styled(Box)({
  position: "relative",
  zIndex: 1,
});

interface PulseAnimationProps extends BoxProps {
  children: ReactNode;
  pulseColor?: string; // optional override
}

export default function PulseAnimation({ children, pulseColor, ...rest }: PulseAnimationProps) {
  return (
    <Wrapper {...rest}>
      <PulseEffect sx={pulseColor ? { backgroundColor: pulseColor } : {}} />
      <Content>{children}</Content>
    </Wrapper>
  );
}
