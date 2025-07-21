import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsDiamondsRecord } from "@/types/diamonds";
import { calcDailySolvedProblemsGrowth } from "@/utils/dayjs";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/system/Box";

interface Props {
  lastTwoDaysSolvedProblems: CodewarsCompletedChallenge[];
}

const PercentVsLastDay = ({ lastTwoDaysSolvedProblems }: Props) => {
  const { today, growthPct } = calcDailySolvedProblemsGrowth(
    lastTwoDaysSolvedProblems
  );

  const isUp = growthPct >= 0;
  const color = isUp ? "success.dark" : "error.main";
  const Icon = isUp ? TrendingUpIcon : TrendingDownIcon;

  return (
    <>
      <Box
        component={Icon}
        sx={{ color, fontSize: "1rem", verticalAlign: "sub" }}
      />
      <Box
        key={today}
        sx={{
          display: "inline",
          fontSize: "0.875rem",
          fontWeight: "bold",
          color,
          mx: 0.5,
        }}
      >
        {growthPct.toFixed(1)}%
      </Box>
      <Box
        sx={{
          color: "text.secondary",
          display: "inline",
          fontSize: "0.845rem",
        }}
      >
        vs. yesterday
      </Box>
    </>
  );
};

export default PercentVsLastDay;
