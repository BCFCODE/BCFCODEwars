import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter } from "@/types/diamonds";
import { TableBody } from "@mui/material";
import SingleRow from "./SingleRow";
import useFilter from "./hooks/useFilter";

export default function Body() {
  const { activeFilter, both, claimed, unClaimed, /* untrackedChallenges */ } =
    useFilter();

  let visibleChallenges: CodewarsCompletedChallenge[];

  switch (activeFilter) {
    case CodeChallengesFilter.ClaimedDiamonds:
      visibleChallenges = claimed;
      break;
    case CodeChallengesFilter.UnclaimedDiamonds:
      visibleChallenges = unClaimed;
      break;
    default:
      visibleChallenges = both;
  }

  return (
    <>
      <TableBody>
        <>
          {/* {(activeFilter === CodeChallengesFilter.UnclaimedDiamonds ||
            activeFilter === CodeChallengesFilter.Both) &&
            untrackedChallenges.map((untrackedChallenge) => (
              <SingleRow
                key={"UNTRACKED AND RECENTLY SOLVED!" + untrackedChallenge.id}
                {...{ challenge: untrackedChallenge }}
              />
            ))} */}
          {visibleChallenges.map((challenge) => (
            <SingleRow key={challenge.id} {...{ challenge }} />
          ))}
        </>
      </TableBody>
    </>
  );
}
