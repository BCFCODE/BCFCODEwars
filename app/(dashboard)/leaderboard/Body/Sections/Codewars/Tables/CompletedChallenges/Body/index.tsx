// import { CodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableBody } from "@mui/material";
import useCodewarsContext from "../../../../../../../../context/hooks/codewars/useCodewarsContext";
import CollectDiamonds from "../Buttons/CollectDiamonds";
import SingleRow from "./SingleRow";
import CollectDiamondsCell from "./SingleRow/Cells/CollectDiamondsCell";

export default function Body() {
  const { completedChallenges = [] } = useCodewarsContext();

  return (
    <>
      <TableBody>
        {completedChallenges.map((challenge) => (
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
