import { TableBody, TableCell, TableRow } from "@mui/material";

import {
  CodewarsCompletedChallenge,
  CodewarsSingleChallenge,
} from "@/types/codewars";
import { useState } from "react";
import useCodewarsContext from "../../../../context/hooks/useCodewarsContext";
import CollectDiamonds from "./Buttons/CollectDiamonds";
import CodewarsService from "@/app/services/codewars-service";
import { codewarsCellStyles } from "../../styles";

const { getRank } = new CodewarsService();

export default function CodewarsCompletedChallengesTableBody() {
  const { completedChallenges = [] } = useCodewarsContext();
  const [challenges, setChallenges] =
    useState<CodewarsCompletedChallenge[]>(completedChallenges);
  const [rank, setRank] = useState<number>();

  const manageSelectedChallenge = (challenge: CodewarsSingleChallenge) => {
    console.log("selectedSingleChallenge", challenge);
    const rank = getRank(challenge);
    setRank(rank);
    // setRank(challenge.)
  };

  return (
    <>
      <TableBody>
        {challenges.map((challenge) => (
          <TableRow key={challenge.id}>
            <TableCell sx={codewarsCellStyles} component="th" scope="row">
              {new Date(challenge.completedAt).toLocaleDateString()}
            </TableCell>
            <TableCell sx={codewarsCellStyles}>
              {challenge.name.length > 50
                ? `${challenge.name.slice(0, 50)}...`
                : challenge.name}
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="center">
              {/* {selectedSingleChallenge?.id === challenge.id && rank} */}
              {/* {challenge.} */}
              {rank}
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              {/* Click and get diamonds */}
              <CollectDiamonds {...{ challenge, manageSelectedChallenge }} />
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              {new Date(challenge.completedAt).toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
