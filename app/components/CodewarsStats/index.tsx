import DailyTarget from "@/app/(dashboard)/Stats/DailyTarget";
import CodewarsTargetGauges from "@/app/(dashboard)/Stats/Gauge";
import { Box } from "@mui/material";

const CodewarsStats = () => (
  <Box
    sx={{
      flexGrow: 1,
      // overflowY: "auto",
      touchAction: "pan-y",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 5,
    }}
  >
    <CodewarsTargetGauges />
    <DailyTarget />
  </Box>
);

export default CodewarsStats;
