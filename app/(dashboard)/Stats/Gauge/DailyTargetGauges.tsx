import Grid from "@mui/material/Grid";
import SingleGauge from "./SingleGauge";
import useChallengeCountsByPeriod from "./hooks/useChallengeCountsByPeriod";
import useGaugeData from "./useGaugeData";
import { CodewarsCompletedChallenge } from "@/types/codewars";

interface Props {
  list: CodewarsCompletedChallenge[];
}

const DailyTargetGauges = ({ list }: Props) => {
  const { inLast24Hours, inLast7Days, inLast30Days, inLast365Days } =
    useChallengeCountsByPeriod({ list });

  return (
    <Grid container spacing={2} columns={24}>
      {[inLast24Hours, inLast7Days, inLast30Days, inLast365Days].map(
        (inLastDaysAgo, i) => (
          <Grid
            sx={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
            size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
            key={i}
          >
            <SingleGauge
              index={i}
              list={list}
              completedChallenges={inLastDaysAgo}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default DailyTargetGauges;
