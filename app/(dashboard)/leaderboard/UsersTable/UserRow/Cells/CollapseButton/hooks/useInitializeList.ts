import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import usePaginationQuery from "../CodewarsTable/Pagination/usePaginationQuery";
import { applyDefaultRewardStatusToAll } from "../utils/applyRewardStatus";
import storeChallengeList from "../utils/storeChallengeList";

const useInitializeList = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListEmpty = !currentUser.codewars?.codeChallenges?.list.length;

  const { data, isSuccess } = usePaginationQuery();

  const initializeCodeChallengesList = async () => {
    if (isSuccess) {
      const list = applyDefaultRewardStatusToAll(data.list);

      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });

      await storeChallengeList({ list, currentUser, queryData: data });
    }
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useInitializeList;
