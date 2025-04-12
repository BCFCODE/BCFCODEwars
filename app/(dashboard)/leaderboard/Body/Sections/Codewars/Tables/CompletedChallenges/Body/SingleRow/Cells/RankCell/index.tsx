import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import Icon from "./Icon";
import { CodewarsRank } from "@/types/diamonds";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell  sx={codewarsCellStyles} align="center">
      <Icon
        rank={
          challenge.moreDetails
            ? (Math.abs(challenge.moreDetails.rank.id) as CodewarsRank)
            : (0 as CodewarsRank)
        }
      />
    </TableCell>
  );
};

export default RankCell;
