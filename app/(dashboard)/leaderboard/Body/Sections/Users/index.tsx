import useDBCurrentUserContext from "@/app/context/hooks/useDBCurrentUserContext";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useState } from "react";
import CodewarsSection from "../Codewars";
import CollapseSection from "../Collapse";
import User from "./UserCells";
import CodewarsProvider from "@/app/context/providers/codewars/CodewarsProvider";

const { getCompletedChallenges } = new CodewarsService();

export function UsersSection() {
  const {
    currentUser: { codewars },
  } = useDBCurrentUserContext();
  const [isCollapse, setIsCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedChallenges, setCompletedChallenges] =
    useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const codewarsUsername = codewars?.username;

  const handleOpen = async () => {
    setIsCollapse(!isCollapse);
    setIsLoading(true);
    handleTry();
  };

  const handleTry = async () => {
    try {
      const response = await getCompletedChallenges(
        codewarsUsername,
        pageNumber
      );

      if ("data" in response) {
        const { data: challenges } = response.data;
        setCompletedChallenges(challenges);
      } else {
        // TODO: Handle cases where data is missing
      }
    } catch (error) {
      // TODO: Handle errors gracefully
      // console.error("Error fetching challenges: ", error);
      setError(true);
    } finally {
      setIsLoading(false);

      // TODO: Add additional cleanup or updates if needed
    }
  };

  const handleRetry = () => {
    setError(false); // Clear the error
    setIsLoading(true); // Re-initiate loading state
    handleRetry();
  };

  return (
    <CodewarsProvider context={{ completedChallenges }}>
      <User onOpen={{ isCollapse, handleOpen }} />
      <CollapseSection {...{ isCollapse }}>
        <CodewarsSection
          {...{  error, handleRetry, isLoading }}
        />
      </CollapseSection>
    </CodewarsProvider>
  );
}
