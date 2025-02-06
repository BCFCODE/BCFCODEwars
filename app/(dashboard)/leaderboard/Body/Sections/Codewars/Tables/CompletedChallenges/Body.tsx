import { TableBody, TableCell, TableRow } from "@mui/material";

import CodewarsService from "@/app/services/codewars-service";
import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";
import { useEffect, useRef, useState } from "react";
import useCodewarsContext from "../../../../../../../context/hooks/useCodewarsContext";
import { codewarsCellStyles } from "../../../../../styles";
import CollectDiamonds from "./Buttons/CollectDiamonds";

const { getRank } = new CodewarsService();

export default function Body() {
  const { completedChallenges = [] } = useCodewarsContext();
  const [challenges, setChallenges] = useState<DBCodewarsCompletedChallenge[]>(
    completedChallenges as DBCodewarsCompletedChallenge[]
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const updatedChallengeListRef = useRef<DBCodewarsCompletedChallenge[]>(
    completedChallenges as DBCodewarsCompletedChallenge[]
  );

  const setIconButtonDisable = (isDisable: boolean) => {
    // Set true when IconButton clicked and false when counter count finished or response not successful
    setIsDisabled(isDisable);
  };

  const manageSelectedChallenge = (
    selectedChallenge: DBCodewarsCompletedChallenge
  ) => {
    console.log("selectedSingleChallenge", selectedChallenge);
    // Add selected challenge to challenges list
    const updatedChallengeList = challenges.map((challenge) =>
      challenge.id === selectedChallenge.id ? selectedChallenge : challenge
    );
    updatedChallengeListRef.current = updatedChallengeList;
  };

  useEffect(() => {
    if (!isDisabled) {
      // render new challenge list only after counter is finished
      setChallenges(updatedChallengeListRef.current);
    }
  }, [isDisabled]);

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
              <CollectDiamonds
                {...{
                  setIconButtonDisable,
                  isDisabled,
                  challenge,
                  manageSelectedChallenge,
                }}
              />
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
