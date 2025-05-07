import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { applyDefaultTrackingAndRewardStatusToAll } from "../utils/applyRewardStatus";
import storeChallengeList from "../utils/storeChallengeList";
import useListQuery from "./ReactQuery/useListQuery";

const useInitializeList = () => {
  const { currentUser } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListEmpty = !currentUser.codewars?.codeChallenges?.list.length;

  const { data, isSuccess } = useListQuery({
    pageNumber,
    username: currentUser.codewars.username,
  });

  const initializeCodeChallengesList = () => {
    if (isSuccess) {
      const list = applyDefaultTrackingAndRewardStatusToAll(data.list);

      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });

      storeChallengeList({ list, currentUser, data });
    }
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useInitializeList;
