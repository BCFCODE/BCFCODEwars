"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

interface Props {
  currentStep: number;
}

const Buttons = ({ currentStep = 0 }: Props) => {
  return (
    <>
      <Button
        component={Link}
        href={`/wars/validation/steps/${currentStep - 1}`}
        color="inherit"
        // onClick={() => router.push(`${currentStep - 1}`)}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        component={Link}
        href={`/wars/validation/steps/${currentStep + 1}`}
        disabled
        // onClick={() => router.push(`${currentStep + 1}`)}
      >
        Next
      </Button>
    </>
  );
};

export default Buttons;
