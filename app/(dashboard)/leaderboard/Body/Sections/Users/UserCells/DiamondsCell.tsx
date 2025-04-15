import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import {
  codewarsCellStyles,
  counterStyles,
  diamondBoxStyles,
  fade,
} from "@/app/(dashboard)/leaderboard/styles";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, TableCell, Typography } from "@mui/material";
import { diamondSumStyles } from "./styles";

const DiamondsCell = () => {
  const { email, diamonds } = useCurrentUser();
  const { data: diamondsData, isError, isLoading } = useDiamondsContext();

  const isCurrentUser = email === diamondsData?.email;

  const diamondsSum = diamonds.totals.total;

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
