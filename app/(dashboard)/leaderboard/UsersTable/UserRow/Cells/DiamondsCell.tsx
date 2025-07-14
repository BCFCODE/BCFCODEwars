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
import { memo } from "react";

interface Props {
  maxWidth: number;
}

const DiamondsCell = memo(({ maxWidth }: Props) => {
  const { currentUser } = useCurrentUserContext();

  const diamondsSum = currentUser.diamonds.totals.total;
  console.log("DiamondsCell rendered"); 
  return (
    <TableCell sx={{ maxWidth, ...codewarsCellStyles }} align="right">
      <Box sx={{ ...diamondBoxStyles }}>
        <DiamondsCard
          diamonds-card="true"
          key={diamondsSum}
          email={currentUser.email}
          label="Total Diamonds"
          sx={{
            marginRight: -8,
            display: "none",
          }}
        />
        <Typography sx={counterStyles}>{diamondsSum}</Typography>
        <DiamondIcon sx={diamondSumStyles} />
      </Box>
    </TableCell>
  );
});

export default DiamondsCell;
