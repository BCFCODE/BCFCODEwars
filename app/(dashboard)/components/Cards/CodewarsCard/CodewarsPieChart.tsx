"use client";

import { KYU_COLORS, royalGold } from "@/theme";
import { Box, SxProps } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";
import Image from "next/image";
import Link from "next/link";

interface Props {
  sx?: SxProps;
  size?: number;
  ranks: number[];
  username?: string;
}

export default function CodewarsPieChart({
  sx,
  ranks,
  username,
  size = 100,
}: Props) {
  // Too many renders, optimize it
  const radius = size / 2 - 5; // padding 5px

  if (ranks.every((rank) => rank === 0)) return null;
  // console.log(ranks);
  return (
    <Box sx={{ ...sx, position: "relative" }}>
      <PieChart
        width={size}
        height={size}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
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

      <Box
        component="a"
        href={`https://www.codewars.com/users/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "absolute",
          fontSize: size * 0.32,
          top: "51%",
          left: "50.2%",
          transform: "translate(-34%, -55%)",
          // pointerEvents: "none", // icon won’t steal hover/touch
        }}
      >
        <Image
          width={size * 0.28}
          height={size * 0.28}
          src="https://www.codewars.com/packs/assets/logo.f607a0fb.svg"
          alt="Codewars Icon"
        />
      </Box>
    </Box>
  );
}
