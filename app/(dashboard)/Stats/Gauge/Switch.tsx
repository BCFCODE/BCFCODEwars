import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useTargetStore from "../DailyTarget/useTargetStore";
import useGaugeData from "./useGaugeData";
import SingleGauge from "./SingleGauge";
import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";

export type GaugeTypes = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  type: GaugeTypes;
  index: number;
}

const GaugeSwitch = ({ index, type }: Props) => {
  const { target } = useTargetStore((state) => state);
  const { counts, percents } = useGaugeData();
  const [count, percent] = [counts, percents].map((data) => data[index]);
  const slicedPercents = percents.slice(index + 1);
  const didLaterPeriodMeetTarget = slicedPercents.some(
    (percent) => percent >= 100
  );

  switch (type) {
    case "daily": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Daily target reached!`
              : `${count} in last 24Hours`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {target * 1}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "weekly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Weekly target reached!`
              : `${count} in last 7Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {target * 7}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "monthly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Monthly target reached!`
              : `${count} in last 30Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {target * 30}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "yearly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Yearly target reached!`
              : `${count} in last 365Days`}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            {count} / {target * 365}
          </Typography>
        </SingleGauge>
      );
    }
  }
};

export default GaugeSwitch;
