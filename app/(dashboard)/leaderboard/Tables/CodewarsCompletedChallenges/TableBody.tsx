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
import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";

const { getRank } = new CodewarsService();

export default function CodewarsCompletedChallengesTableBody() {
  const { completedChallenges = [] } = useCodewarsContext();
  const [challenges, setChallenges] = useState<DBCodewarsCompletedChallenge[]>(
    completedChallenges as DBCodewarsCompletedChallenge[]
  );

  const manageSelectedChallenge = (
    selectedChallenge: CodewarsSingleChallenge
  ) => {
    console.log("selectedSingleChallenge", selectedChallenge);
    // Add selected challenge to challenges list
    const newChallengeList = challenges.map((challenge) =>
      challenge.id === selectedChallenge.id
        ? { ...challenge, ...selectedChallenge }
        : challenge
    ) as DBCodewarsCompletedChallenge[];

     setChallenges(newChallengeList);
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
              {challenge.rank?.id ? getRank(challenge) : ""}
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
