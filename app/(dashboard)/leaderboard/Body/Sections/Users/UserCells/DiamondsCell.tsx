import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
  fade,
} from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";
import { diamondSumStyles } from "./styles";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";

const DiamondsCell = () => {
  const { data: diamondsData, isError, isLoading } = useDiamondsContext();
  const { currentUser } = useCurrentUserContext();

  const isCurrentUser = currentUser.email === diamondsData?.email;

  // const diamondsSum = isCurrentUser ? currentUser.diamonds.totals.total : 0;
  const diamondsSum = currentUser.diamonds.totals.total;
  // console.log('diamondsSum', diamondsSum, currentUser.diamonds?.totals.total, currentUser.email, diamondsData)
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
