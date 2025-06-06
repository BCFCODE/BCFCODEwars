import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";
import { diamondSumStyles } from "./styles";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";

const DiamondsCell = () => {
  const { currentUser } = useCurrentUserContext();

  const diamondsSum = currentUser.diamonds.totals.total;

  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>{diamondsSum}</Typography>
        <DiamondIcon sx={diamondSumStyles} />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
