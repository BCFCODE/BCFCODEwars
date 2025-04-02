import { useContext } from "react";
import { AllUsersContext, AllUsersContextType } from "../../providers/AllUsers";

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
