import {
  codewarsCellStyles,
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  fade,
} from "@/app/(dashboard)/leaderboard/styles";
import useDBCurrentUserContext from "@/app/context/hooks/useContexts/useDBCurrentUserContext";
import useDBDiamondsContext from "@/app/context/hooks/useContexts/useDBDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";

const DiamondsCell = () => {
  const isLoading = false;
  const isError = false;
  const { data: diamondsData } = useDBDiamondsContext();
  const { currentUser } = useDBCurrentUserContext();
  console.log(
    "DiamondsCell >>\n",
    "currentUser >>",
    currentUser,
    "useDBDiamondsContext diamondsData",
    diamondsData
  );

  const diamondsSum =
    currentUser.codewars?.id === diamondsData.codewars.id
      ? diamondsData.diamonds.sum
      : null;

  // if (!diamondsSum) return null;

  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>{diamondsSum}</Typography>
        <DiamondIcon
          sx={isLoading || isError ? fade(isError) : collectedDiamondStyles}
        />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
