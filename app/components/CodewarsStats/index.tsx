import GaugeProvider from "@/app/context/providers/GaugeProvider";
import DailyTarget from "@/app/(dashboard)/Stats/DailyTarget";
import CodewarsTargetGauges from "@/app/(dashboard)/Stats/Gauge";
import { Box } from "@mui/material";

interface Props {
  email: string;
}

const CodewarsStats = ({ email }: Props) => (
  <Box
    sx={{
      flexGrow: 1,
      // overflowY: "auto",
      touchAction: "pan-y",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 5,
    }}
  >
    <GaugeProvider context={{ email }}>
      <CodewarsTargetGauges />
    </GaugeProvider>
    <DailyTarget />
  </Box>
);

export default CodewarsStats;
