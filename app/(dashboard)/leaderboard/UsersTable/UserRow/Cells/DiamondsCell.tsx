import DiamondsCard from "@/app/(dashboard)/components/DiamondsCard";
import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";
import { diamondSumStyles } from "./styles";
import { memo, useState } from "react";

interface Props {
  maxWidth: number;
}

const DiamondsCell = memo(({ maxWidth }: Props) => {
  const [showDiamondsCard, setShowDiamondsCard] = useState(false);
  const { currentUser } = useCurrentUserContext();

  const diamondsSum = currentUser.diamonds.totals.total;

  // console.log("DiamondsCell rendered..."); // to many renders optimize it
  return (
    <TableCell
      onMouseEnter={() => diamondsSum && setShowDiamondsCard(true)}
      onMouseLeave={() => diamondsSum && setShowDiamondsCard(false)}
      sx={{ maxWidth, ...codewarsCellStyles }}
      align="right"
    >
      <Box sx={{ ...diamondBoxStyles, position: "relative" }}>
        <Typography
          sx={{ ...counterStyles, opacity: !showDiamondsCard ? 1 : 0 }}
        >
          {diamondsSum}
        </Typography>
        <DiamondIcon
          sx={{ ...diamondSumStyles, opacity: !showDiamondsCard ? 1 : 0 }}
        />
        {showDiamondsCard && (
          <DiamondsCard
            key={diamondsSum}
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
