import { useContext } from "react";
import { AllUsersContext } from "../../providers/db/allUsers/AllUsersProvider";
import { AllUsersContextType } from "../../providers/db/allUsers/types";

const useDBAllUsersContext = (): AllUsersContextType => {
  const context = useContext(AllUsersContext);

  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a useCurrentUserContext"
    );
  }
  return context;
};

export default useDBAllUsersContext;
