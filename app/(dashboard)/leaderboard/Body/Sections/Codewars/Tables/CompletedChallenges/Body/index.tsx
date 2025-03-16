// import { CodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableBody } from "@mui/material";
import useCodewarsContext from "../../../../../../../../context/hooks/codewars/useCodewarsContext";
// import CollectDiamonds from "../Buttons/CollectDiamonds";
import SingleRow from "./SingleRow";
import CollectDiamondsCell from "./SingleRow/Cells/CollectDiamondsCell";
import CollectDiamonds from "../Buttons/CollectDiamonds";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

export default function Body() {
  const { currentUser } = useCurrentUserContext();
  // console.log(
  //   "codewarsUsers in Table/CompletedChallenges/Body/index.tsx",
  //   codewarsUsers
  // );
  // console.log(
  //   'currentUser in Table/CompletedChallenges/Body/index.tsx"',
  //   currentUser.codewars.codeChallenges.list
  // );
  // console.log(
  //   "currentUser.codewars.codeChallenges.list in completedChallenges.map((challenge...",
  //   currentUser.codewars.codeChallenges.list
  // );
  return (
    <>
      <TableBody>
        {currentUser.codewars.codeChallenges.list.map((challenge) => (
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
