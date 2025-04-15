import dbAPIService from "@/app/api/services/db";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { useUsersStore } from "@/app/store/users";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useEffect, useRef } from "react";

const { postCurrentUser } = new dbAPIService();

interface Props {
  collectedDiamondsCount: number | undefined;
  success: boolean;
  isDiamondIconButtonDisabled: boolean;
}
export default function useChallengesListEffect({
  collectedDiamondsCount = 0,
  success,
  isDiamondIconButtonDisabled,
}: Props) {
  const {
    currentUser,
    actions: { updateCodeChallengesList, updateDiamondsAndRank },
  } = useUsersStore((state) => state);
  const { selectedChallenge } = useCodewarsContext();
  
  const isListUpdatedRef = useRef(false);
  const isDiamondsUpdatedRef = useRef(false);

  useEffect(() => {
    if (success && !isDiamondIconButtonDisabled && currentUser) {
      const list = currentUser?.codewars.codeChallenges.list.map((challenge) =>
        challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
      ) as CodewarsCompletedChallenge[];

      if (!isListUpdatedRef.current) {
        const userWithUpdatedList = { ...currentUser };
        userWithUpdatedList.codewars.codeChallenges.list = [...list];
        postCurrentUser(userWithUpdatedList);
        isListUpdatedRef.current = true;
      }

      updateCodeChallengesList(list);
    }

    if (success && !isDiamondsUpdatedRef.current && selectedChallenge) {

      updateDiamondsAndRank({
        selectedChallenge,
        reward: collectedDiamondsCount,
      });

      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [
    success,
    isDiamondIconButtonDisabled,
    collectedDiamondsCount,

    
    selectedChallenge,
  ]);
}
