import { TableBody, TableCell, TableRow } from "@mui/material";

import { CodewarsTableProps } from "./Table";
import { textStyles } from "../../styles";
import GetDiamondsButton from "../Buttons/GetDiamonds/GetDiamondsButton";

export default function CodewarsCompletedChallengesTableBody({
  userInDB,
  completedChallenges,
}: CodewarsTableProps) {
  return (
    <>
      <TableBody>
        {completedChallenges?.map((challenge) => (
          <TableRow key={challenge.id}>
            <TableCell sx={textStyles} component="th" scope="row">
              {new Date(challenge.completedAt).toLocaleDateString()}
            </TableCell>
            <TableCell sx={textStyles}>
              {challenge.name.length > 50
                ? `${challenge.name.slice(0, 50)}...`
                : challenge.name}
            </TableCell>
            <TableCell sx={textStyles} align="right">
              {/* Challenge Rank */}
            </TableCell>
            <TableCell sx={textStyles} align="right">
              {/* Click and get diamonds */}
              <GetDiamondsButton {...{ userInDB, challenge }} />
            </TableCell>
            <TableCell sx={textStyles} align="right">
              {new Date(challenge.completedAt).toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
