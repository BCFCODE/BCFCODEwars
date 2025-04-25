"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

interface Props {
  currentStep: number;
  onYes: () => void;
}

const Buttons = ({ onYes, currentStep = 0 }: Props) => {
  return (
    <>
      <Button
        component={Link}
        href={`/wars/validation/steps/${currentStep - 1}`}
        color="inherit"
        disabled={currentStep === 3}
        sx={{ mr: 1 }}
      >
        No
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={onYes}>Yes, it is me</Button>
    </>
  );
};

export default Buttons;
