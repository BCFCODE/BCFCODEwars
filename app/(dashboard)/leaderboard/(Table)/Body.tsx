import { TableBody, TableCell, TableRow } from "@mui/material";
import { completedChallenges } from "./Data";
import { textStyles } from "./styles";

const Body = () => {
  return (
    <TableBody>
      {completedChallenges.map((challenge) => (
        <TableRow key={challenge.date}>
          <TableCell sx={textStyles} component="th" scope="row">
            {challenge.date}
          </TableCell>
          <TableCell sx={textStyles}>{challenge.customerId}</TableCell>
          <TableCell sx={textStyles} align="right">
            {challenge.amount}
          </TableCell>
          <TableCell sx={textStyles} align="right">
            {/* user.rank ?? */ 'Rank'}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default Body;
