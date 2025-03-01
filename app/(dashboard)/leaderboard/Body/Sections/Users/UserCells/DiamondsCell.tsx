import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
  fade,
} from "@/app/(dashboard)/leaderboard/styles";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";
import { diamondSumStyles } from "./styles";

const DiamondsCell = () => {
  const { data: diamondsData, isError, isLoading } = useDiamondsContext();
  const { currentUser } = useDBCurrentUserContext();
  console.log(
    "DiamondsCell >>\n",
    "currentUser >>",
    currentUser,
    "useDiamondsContext diamondsData",
    diamondsData
  );

  const isCurrentUser = currentUser.email === diamondsData?.email;

  const diamondsSum = isCurrentUser ? diamondsData?.sum.total : 0;

  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>{diamondsSum}</Typography>
        <DiamondIcon
          sx={
            (isLoading || isError) && isCurrentUser
              ? fade(isError)
              : diamondSumStyles
          }
        />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
