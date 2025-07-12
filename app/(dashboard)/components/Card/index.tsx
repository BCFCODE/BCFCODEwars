import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";
import DiamondsPieChart from "./DiamondsPieChart";
import TotalDiamondsCount from "./TotalDiamondsCount";

interface Props {
  email: string;
  label: string;
  sx: SxProps;
}

export default function DashboardCard({ sx, email, label }: Props) {
  // const { data } = useCurrentUserQuery(email); how to access this in this server component ?

  return (
    <Box sx={{ ...sx, display: "flex" }}>
      <Box>
        <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

        <TotalDiamondsCount email={email} />

        <Box
          component={TrendingUpIcon}
          sx={{ color: "success.dark", fontSize: "1rem", verticalAlign: "sub" }}
        />
        <Box
          sx={{
            display: "inline",
            fontSize: "0.875rem",
            fontWeight: "bold",
            color: "success.dark",
            mx: 0.5,
          }}
        >
          18.7%
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
      </Box>
      <DiamondsPieChart email={email} />
    </Box>
  );
}
