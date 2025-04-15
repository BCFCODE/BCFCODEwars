import { useUsersStore } from "@/app/store/users";
import { CodewarsChallengesResponse } from "@/types/codewars";
import { applyDefaultTrackingAndRewardStatusToAll } from "../utils/applyRewardStatus";
import storeChallengeList from "../utils/storeChallengeList";

const useInitializeList = () => {
  const {
    currentUser,
    actions: { updateCodeChallengesList },
  } = useUsersStore((state) => state);

  const isListEmpty = !currentUser?.codewars?.codeChallenges?.list.length;

  const initializeCodeChallengesList = (
    response: CodewarsChallengesResponse
  ) => {
    const list = applyDefaultTrackingAndRewardStatusToAll(response.data);

    updateCodeChallengesList(list);

    if (currentUser) storeChallengeList({ list, currentUser });
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useInitializeList;
