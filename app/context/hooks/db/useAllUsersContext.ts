import { useContext } from "react";
import { AllUsersContextType } from "../../reducers/allUsersReducer";
import { AllUsersContext } from "../../providers/contexts";

const useAllUsersContext = (): AllUsersContextType => {
  const context = useContext(AllUsersContext);

  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserContextProvider"
    );
  }
  return context;
};

export default useAllUsersContext;
