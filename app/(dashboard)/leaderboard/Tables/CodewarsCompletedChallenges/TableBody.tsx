import { TableBody, TableCell, TableRow } from "@mui/material";

import { textStyles } from "../../styles";
import CollectDiamonds from "./Buttons/CollectDiamonds";
import useCodewarsContext from "../../../../context/hooks/useCodewarsContext";

export default function CodewarsCompletedChallengesTableBody() {
  const { completedChallenges } = useCodewarsContext();

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
              <CollectDiamonds {...{ challenge }} />
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
