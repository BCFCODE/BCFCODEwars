"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import {
  calcWeeklyDiamondGrowth,
  completedAfterThreshold,
} from "@/utils/dayjs";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Box from "@mui/system/Box";

interface Props {
  email: string;
}

const PercentVsLastWeek = ({ email }: Props) => {
  const { data } = useCurrentUserQuery(email ?? "");

  if (!data) return null;

  const { growthPct } = calcWeeklyDiamondGrowth(data.diamonds.codewars ?? []);
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
        sx={{
          display: "inline",
          fontSize: "0.875rem",
          fontWeight: "bold",
          color,
          mx: 0.5,
        }}
      >
        {growthPct.toFixed(1)} %
      </Box>
      <Box
        sx={{
          color: "text.secondary",
          display: "inline",
          fontSize: "0.875rem",
        }}
      >
        vs. last week
      </Box>
    </>
  );
};

export default PercentVsLastWeek;
