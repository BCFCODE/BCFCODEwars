import { useContext } from "react";
import { AllUsersContextType } from "../../providers/db/allUsers/types";
import { AllUsersContext } from "../../providers/AllUsers";

const useAllUsersContext = (): AllUsersContextType => {
  const context = useContext(AllUsersContext);

  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a useCurrentUserContext"
    );
  }
  return context;
};

export default useAllUsersContext;
