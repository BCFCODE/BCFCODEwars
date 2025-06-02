import GaugeProvider, {
  GaugeContextValue,
} from "@/app/context/providers/GaugeProvider";
import DailyTarget from "@/app/(dashboard)/Stats/DailyTarget";
import Gauges from "@/app/(dashboard)/Stats/Gauges";
import { Box } from "@mui/material";

const CodewarsStats = ({ email, gaugeStyles }: GaugeContextValue) => (
  <Box
    sx={{
      // backgroundColor: 'yellowgreen',
      width: "100%",
      touchAction: "pan-y",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 5,
    }}
  >
    <GaugeProvider context={{ email, gaugeStyles }}>
      <Box
        sx={{
          // backgroundColor: "gray",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          // height: 100,
        }}
      >
        <Gauges />
        <DailyTarget />
      </Box>
    </GaugeProvider>
  </Box>
);

export default CodewarsStats;
