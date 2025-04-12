import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsRank } from "@/types/diamonds";
import { Box, TableCell } from "@mui/material";
import Icon from "./Icon";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell align="center">
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Icon
          rank={
            challenge.moreDetails
              ? (Math.abs(challenge.moreDetails.rank.id) as CodewarsRank)
              : (0 as CodewarsRank)
          }
        />
      </Box>
    </TableCell>
  );
};

export default RankCell;
