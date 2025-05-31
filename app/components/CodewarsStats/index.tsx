import GaugeProvider, {
  GaugeContextValue,
} from "@/app/context/providers/GaugeProvider";
import DailyTarget from "@/app/(dashboard)/Stats/DailyTarget";
import CodewarsTargetGauges from "@/app/(dashboard)/Stats/Gauge";
import { Box } from "@mui/material";

const CodewarsStats = ({ email, columnsPerBreakpoint }: GaugeContextValue) => (
  <Box
    sx={{
      // backgroundColor: 'yellowgreen',
      width: "100%",
      // flexGrow: 1,
      // overflowY: "auto",
      touchAction: "pan-y",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 5,
    }}
  >
    <GaugeProvider context={{ email, columnsPerBreakpoint }}>
      <CodewarsTargetGauges />
      <DailyTarget />
    </GaugeProvider>
  </Box>
);

export default CodewarsStats;
