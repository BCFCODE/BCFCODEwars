"use client";

import Container from "./Container";
import TargetPickerSlider from "./Slider";

export default function DailyTarget() {
  return <Container slider={<TargetPickerSlider />} />;
}

// "use client";

// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";
// import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
// import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Trophy icon for success!

// const marks = [
//   {
//     value: 0,
//     label: <SignalCellularAlt1BarIcon color="error" sx={{ fontSize: 24 }} />,
//   },
//   {
//     value: 20,
//     label: <SignalCellularAlt2BarIcon color="warning" sx={{ fontSize: 24 }} />,
//   },
//   {
//     value: 50,
//     label: <SignalCellularAltIcon color="info" sx={{ fontSize: 24 }} />,
//   },
//   {
//     value: 100,
//     label: <TipsAndUpdatesIcon color="success" sx={{ fontSize: 24 }} />,
//   },
// ];

// function valuetext(value: number) {
//   return `${value} Problems`;
// }

// export default function DailyTarget() {
//   const [isHovering, setIsHovering] = useState(false);

//   return (
//     <Box
//       sx={{
//         width: 300,
//         mt: 4,
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         transition: "all 0.5s ease",
//       }}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Slider */}
//       <Box
//         sx={{
//           width: "100%",
//           opacity: isHovering ? 0 : 1,
//           transform: isHovering ? "scale(0.95)" : "scale(1)",
//           transition: "all 0.5s ease",
//           position: "absolute",
//         }}
//       >
//         <Slider
//           aria-label="Daily Target"
//           defaultValue={20}
//           getAriaValueText={valuetext}
//           step={null}
//           marks={marks}
//           color="primary"
//           valueLabelDisplay="off"
//         />
//       </Box>

//       {/* Replacement component on hover */}
//       {isHovering && (
//         <Box
//           sx={{
//             opacity: 1,
//             transition: "opacity 0.5s ease",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <EmojiEventsIcon color="success" sx={{ fontSize: 48 }} />
//           <Typography
//             variant="h6"
//             sx={{ color: "success.main", fontWeight: "bold", letterSpacing: 1 }}
//           >
//             Keep Going!
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }
