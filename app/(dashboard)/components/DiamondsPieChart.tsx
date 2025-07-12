"use client";

import { Box, SxProps } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";
import DiamondIcon from "@mui/icons-material/Diamond";

const KYU_COLORS = [
  "#F2F2F2", // 8 kyū
  "#FFE066", // 7 kyū
  "#FFB74D", // 6 kyū
  "#FF7043", // 5 kyū
  "#D95F8A", // 4 kyū
  "#8D5FBF", // 3 kyū
  "#4A7BD0", // 2 kyū
  "#243B55", // 1 kyū
];

const kyuData = KYU_COLORS.map((color, i) => ({
  id: `${8 - i}k`,
  label: `${8 - i} kyū`,
  value: i === 0 ? 5 : 20,
  color,
}));

interface Props {
  sx?: SxProps;
  size?: number;
}

export default function DiamondsPieChart({ sx, size = 100 }: Props) {
  const radius = size / 2 - 5; // padding 5px

  return (
    <Box sx={{ position: "relative" }}>
      <PieChart
        sx={{
          ...sx,
          // backgroundColor: "yellowgreen",
        }}
        width={size}
        height={size}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        colors={KYU_COLORS}
        hideLegend
        series={[
          {
            data: kyuData,
            innerRadius: radius * 0.5,
            outerRadius: radius,
            paddingAngle: 2,
            cornerRadius: 3,
            startAngle: -180,
            endAngle: 180,
            cx: 55,
            cy: 45,
            // arcLabel: ({ id }) => id,
            arcLabelMinAngle: 18,
          },
        ]}
      />
      <DiamondIcon
        sx={{
          position: "absolute",
          fontSize: size * 0.32,
          top: "50%",
          left: "50%",
          transform: "translate(-35%, -55%)",
          color: "#FFD700", // classic gold color
          filter: "drop-shadow(0 0 4px #FFC107)", // subtle glowing effect
          // filter: "drop-shadow(0 0 4px black)",
          // color: "#FFB74D", // brand colour or theme.palette.warning.main
          pointerEvents: "none", // icon won’t steal hover/touch
        }}
      />
    </Box>
  );
}
