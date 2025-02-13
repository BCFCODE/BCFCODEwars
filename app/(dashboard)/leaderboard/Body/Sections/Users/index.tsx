import { useState } from "react";
import CodewarsSection from "../Codewars";
import { handleTry } from "../Codewars/Tables/CompletedChallenges/Error";
import CollapseSection from "../Collapse";
import User from "./UserCells";
import useCodewarsDispatchContext from "@/app/context/hooks/useCodewarsDispatchContext";
import useCodewarsContext from "@/app/context/hooks/useCodewarsContext";
import useDBCurrentUserContext from "@/app/context/hooks/useDBCurrentUserContext";

export function UsersSection() {
  const { currentUser } = useDBCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  const dispatch = useCodewarsDispatchContext();
  const [isCollapse, setIsCollapse] = useState(false);

  const handleOpen = async () => {
    setIsCollapse(!isCollapse);
    dispatch({ type: "SET_LOADING", isLoading: true });
    handleTry(currentUser, pageNumber, dispatch);
  };

  return (
    <>
      <User onOpen={{ isCollapse, handleOpen }} />
      <CollapseSection {...{ isCollapse }}>
        <CodewarsSection />
      </CollapseSection>
    </>
  );
}
