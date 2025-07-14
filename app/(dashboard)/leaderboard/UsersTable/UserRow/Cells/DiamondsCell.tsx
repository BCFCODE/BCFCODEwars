import DiamondsCard from "@/app/(dashboard)/components/Cards/DiamondsCard";
import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography, keyframes } from "@mui/material";
import { memo, useState } from "react";
import CountUp from "react-countup";
import { diamondSumStyles } from "./styles";

interface Props {
  maxWidth: number;
}

const DiamondsCell = memo(({ maxWidth }: Props) => {
  const [showDiamondsCard, setShowDiamondsCard] = useState(false);
  const { currentUser } = useCurrentUserContext();

  const diamondsSum = currentUser?.diamonds?.totals?.total;

  return (
    <TableCell
      onMouseEnter={() => diamondsSum && setShowDiamondsCard(true)}
      onMouseLeave={() => setShowDiamondsCard(false)}
      sx={{ maxWidth, ...codewarsCellStyles }}
      align="right"
    >
      <Box sx={{ ...diamondBoxStyles, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.1 }}>
          <Typography sx={counterStyles}>
            <CountUp end={diamondsSum} duration={0.7} />
          </Typography>

          <DiamondIcon sx={diamondSumStyles} />
        </Box>

        {showDiamondsCard && (
          <DiamondsCard
            email={currentUser.email}
            label="Total Diamonds"
            sx={{
              position: "absolute",
              right: -60,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </TableCell>
  );
});

export default DiamondsCell;
