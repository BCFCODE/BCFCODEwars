import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableBody } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useCodewarsContext from "../../../../../../../../context/hooks/useContexts/useCodewarsContext";
import CollectDiamonds from "../Buttons/CollectDiamonds";
import SingleRow from "./SingleRow";
import CollectDiamondsCell from "./SingleRow/Cells/CollectDiamondsCell";

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

  const collectDiamondsProps = (challenge: DBCodewarsCompletedChallenge) => ({
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
