import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsRank } from "@/types/diamonds";

const getRank = (selectedChallenge: CodewarsCompletedChallenge): CodewarsRank =>
  Math.abs(selectedChallenge.moreDetails?.rank.id as number) as CodewarsRank;

export default getRank;
