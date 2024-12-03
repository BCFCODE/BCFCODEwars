// import { Box, Button } from "@mui/material";
// import React from "react";

// interface Props {
//   handleNext: () => void;
//   handleBack: () => void;
//   activeStep: number;
//   steps: string[];
// }

// const Buttons = ({ activeStep, handleNext, handleBack, steps }: Props) => {
  
//   return (
//     <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//       <Button
//         color="inherit"
//         disabled={activeStep === 0}
//         onClick={handleBack}
//         sx={{ mr: 1 }}
//       >
//         Back
//       </Button>
//       <Box sx={{ flex: "1 1 auto" }} />
//       <Button onClick={handleNext}>
//         {activeStep === steps.length - 1 ? "Finish" : "Next"}
//       </Button>
//     </Box>
//   );
// };

// export default Buttons;
