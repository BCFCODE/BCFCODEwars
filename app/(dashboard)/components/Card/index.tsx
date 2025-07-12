import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";
import DiamondsPieChart from "./DiamondsPieChart";
import TotalDiamondsCount from "./TotalDiamondsCount";
import PercentVsLastWeek from "./PercentVsLastWeek";

interface Props {
  email: string;
  label: string;
  sx: SxProps;
}

export default function DashboardCard({ sx, email, label }: Props) {

  return (
    <Box sx={{ ...sx, display: "flex" }}>
      <Box>
        <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

        <TotalDiamondsCount email={email} />

        <PercentVsLastWeek email={email}/>
      </Box>
      <DiamondsPieChart email={email} />
    </Box>
  );
}
