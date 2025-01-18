import { CodewarsChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";

const postChallenge = (challenge: CodewarsChallenge) => {
  try {
    const response = fetch(`${baseURL}/api/wars/codewars/challenge`);
  } catch (error) {}
};

export default postChallenge;
