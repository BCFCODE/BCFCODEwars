import {
  codewarsCellStyles,
  diamondBoxStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useDBDiamondsContext from "@/app/context/hooks/useDBDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";

const DiamondsCell = () => {
  const {
    data: { diamonds },
  } = useDBDiamondsContext();
  console.log(diamonds, "<<<<< DiamondsCell");
  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography>{diamonds.sum}</Typography>
        <DiamondIcon />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
