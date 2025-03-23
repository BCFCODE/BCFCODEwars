// import { CodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableBody } from "@mui/material";
import useCodewarsContext from "../../../../../../../../context/hooks/codewars/useCodewarsContext";
// import CollectDiamonds from "../Buttons/CollectDiamonds";
import SingleRow from "./SingleRow";
import CollectDiamondsCell from "./SingleRow/Cells/CollectDiamondsCell";
import CollectDiamonds from "../Buttons/CollectDiamonds";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";

export default function Body() {
  const { currentUser } = useCurrentUserContext();
  console.log("currentUser in Body for filtering", currentUser);

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const visibleChallenges =
    activeFilter === CodeChallengesFilter.Both
      ? list
      : list.filter((challenge) => challenge.rewardStatus === activeFilter);

  return (
    <>
      <TableBody>
        {list.map((challenge) => (
          <SingleRow key={challenge.id} {...{ challenge }}>
            <CollectDiamondsCell>
              <CollectDiamonds currentChallenge={challenge} />
            </CollectDiamondsCell>
          </SingleRow>
        ))}
      </TableBody>
    </>
  );
}
