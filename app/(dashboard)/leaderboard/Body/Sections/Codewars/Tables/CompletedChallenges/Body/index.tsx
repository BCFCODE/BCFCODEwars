// import { CodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableBody } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useCodewarsContext from "../../../../../../../../context/hooks/useContexts/useCodewarsContext";
import CollectDiamonds from "../Buttons/CollectDiamonds";
import SingleRow from "./SingleRow";
import CollectDiamondsCell from "./SingleRow/Cells/CollectDiamondsCell";
import { CodewarsCompletedChallenge } from "@/types/codewars";

export default function Body() {
  const { completedChallenges = [] } = useCodewarsContext();
  const [challenges, setChallenges] = useState<CodewarsCompletedChallenge[]>(
    completedChallenges as CodewarsCompletedChallenge[]
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const updatedChallengeListRef = useRef<CodewarsCompletedChallenge[]>(
    completedChallenges as CodewarsCompletedChallenge[]
  );

  const setIconButtonDisable = (isDisable: boolean) => {
    // Set true when IconButton clicked and false when counter count finished or response not successful
    setIsDisabled(isDisable);
  };

  const manageSelectedChallenge = (
    selectedChallenge: CodewarsCompletedChallenge
  ) => {
    console.log("selectedSingleChallenge", selectedChallenge);
    // Add selected challenge to challenges list
    const updatedChallengeList = challenges.map((challenge) =>
      challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
    );
    updatedChallengeListRef.current = updatedChallengeList;
  };

  useEffect(() => {
    if (!isDisabled) {
      // render new challenge list only after counter is finished
      setChallenges(updatedChallengeListRef.current);
    }
  }, [isDisabled]);

  const collectDiamondsProps = (challenge: CodewarsCompletedChallenge) => ({
    setIconButtonDisable,
    isDisabled,
    challenge,
    manageSelectedChallenge,
  });

  return (
    <>
      <TableBody>
        {challenges.map((challenge) => (
          <SingleRow key={challenge.id} {...{ challenge }}>
            <CollectDiamondsCell>
              <CollectDiamonds {...collectDiamondsProps(challenge)} />
            </CollectDiamondsCell>
          </SingleRow>
        ))}
      </TableBody>
    </>
  );
}
