import {
  codewarsCellStyles,
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  fade
} from "@/app/(dashboard)/leaderboard/styles";
import useDBDiamondsContext from "@/app/context/hooks/useDBDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";

const DiamondsCell = () => {
  const isLoading = false;
  const isError = false;
  const {
    data: { diamonds },
  } = useDBDiamondsContext();
  console.log(diamonds, "<<<<< DiamondsCell");
  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>{diamonds.sum}</Typography>
        <DiamondIcon
          sx={isLoading || isError ? fade(isError) : collectedDiamondStyles}
        />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
