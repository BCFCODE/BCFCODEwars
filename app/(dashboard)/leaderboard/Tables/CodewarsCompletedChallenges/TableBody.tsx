import { TableBody, TableCell, TableRow } from "@mui/material";

import { CodewarsSingleChallenge } from "@/types/codewars";
import { useState } from "react";
import useCodewarsContext from "../../../../context/hooks/useCodewarsContext";
import { textStyles } from "../../styles";
import CollectDiamonds from "./Buttons/CollectDiamonds";

export default function CodewarsCompletedChallengesTableBody() {
  const { completedChallenges } = useCodewarsContext();
  const [rank, setRank] = useState<number>();

  const manageSelectedChallenge = (selectedSingleChallenge: CodewarsSingleChallenge) => {
    console.log("selectedSingleChallenge = ", selectedSingleChallenge);
    // setRank(challenge.)
  };

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
              {rank}
            </TableCell>
            <TableCell sx={textStyles} align="right">
              {/* Click and get diamonds */}
              <CollectDiamonds {...{ challenge, manageSelectedChallenge }} />
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
