import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import Icon from "./Icon";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      <Icon
        rank={
          challenge.moreDetails ? Math.abs(challenge.moreDetails.rank.id) : 0
        }
      />
    </TableCell>
  );
};

export default RankCell;
