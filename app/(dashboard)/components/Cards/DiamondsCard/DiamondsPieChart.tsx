"use client";

import { KYU_COLORS, royalGold } from "@/theme";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, SxProps } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";

interface Props {
  sx?: SxProps;
  size?: number;
  ranks: number[];
}

export default function DiamondsPieChart({ sx, ranks, size = 100 }: Props) {
  // Too many renders, optimize it
  const radius = size / 2 - 5; // padding 5px

  if (ranks.every((rank) => rank === 0)) return null;
  // console.log(ranks);
  return (
    <Box sx={{ ...sx, position: "relative" }}>
      <PieChart
        width={size}
        height={size}
        margin={0}
        colors={KYU_COLORS}
        hideLegend
        series={[
          {
            data: KYU_COLORS.map((color, i) => ({
              id: `${8 - i}k`,
              label: `${8 - i} kyū`,
              value: ranks[7 - i],
              color,
            })),
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
          transform: "translate(-34%, -55%)",
          color: royalGold, // classic gold color
          filter: "drop-shadow(0 0 4px #FFD700)", // royalGold color
          pointerEvents: "none", // icon won’t steal hover/touch
        }}
      />
    </Box>
  );
}
