import { TableBody, TableCell, TableRow } from "@mui/material";

import {
  CodewarsCompletedChallenge,
  CodewarsSingleChallenge,
} from "@/types/codewars";
import { useState } from "react";
import useCodewarsContext from "../../../../context/hooks/useCodewarsContext";
import { textStyles } from "../../styles";
import CollectDiamonds from "./Buttons/CollectDiamonds";
import CodewarsService from "@/app/services/codewars-service";

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
            <TableCell sx={textStyles} component="th" scope="row">
              {new Date(challenge.completedAt).toLocaleDateString()}
            </TableCell>
            <TableCell sx={textStyles}>
              {challenge.name.length > 50
                ? `${challenge.name.slice(0, 50)}...`
                : challenge.name}
            </TableCell>
            <TableCell sx={textStyles} align="right">
              {/* {selectedSingleChallenge?.id === challenge.id && rank} */}
              {/* {challenge.} */}
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
