import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import ChallengeName from "./ChallengeName";
import { nameCellStyles } from "./styles";

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const NameCell = ({ currentChallenge }: Props) => {
  return (
    <TableCell sx={nameCellStyles}>
      <ChallengeName text={currentChallenge.name} length={55} />
    </TableCell>
  );
};

export default NameCell;
