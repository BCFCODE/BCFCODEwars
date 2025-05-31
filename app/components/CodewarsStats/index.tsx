import GaugeProvider, {
  GaugeContextValue,
} from "@/app/context/providers/GaugeProvider";
import DailyTarget from "@/app/(dashboard)/Stats/DailyTarget";
import CodewarsTargetGauges from "@/app/(dashboard)/Stats/Gauge";
import { Box } from "@mui/material";

const CodewarsStats = ({ email, dimensions }: GaugeContextValue) => (
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
    <GaugeProvider context={{ email, dimensions }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <CodewarsTargetGauges />
        <DailyTarget />
      </Box>
    </GaugeProvider>
  </Box>
);

export default CodewarsStats;
