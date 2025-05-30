import { Typography } from "@mui/material";
import useTargetStore from "../DailyTarget/useTargetStore";
import SingleGauge from "./SingleGauge";
import useGaugeData from "./useGaugeData";
import useGaugeContext from "@/app/context/hooks/useGaugeContext";

export type GaugeTypes = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  type: GaugeTypes;
  index: number;
}

const GaugeSwitch = ({ index, type }: Props) => {
  const { email } = useGaugeContext();
  const label = useTargetStore((state) => state.label[email] ?? 1);
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
              ? `Daily label reached!`
              : `${count} in last 24Hours`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 1}
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
              ? `Weekly label reached!`
              : `${count} in last 7Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 7}
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
              ? `Monthly label reached!`
              : `${count} in last 30Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 30}
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
              ? `Yearly label reached!`
              : `${count} in last 365Days`}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            {count} / {label * 365}
          </Typography>
        </SingleGauge>
      );
    }
  }
};

export default GaugeSwitch;
