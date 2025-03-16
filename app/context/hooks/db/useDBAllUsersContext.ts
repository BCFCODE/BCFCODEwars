import { useContext } from "react";
import { DBAllUsersContext } from "../../providers/db/allUsers/dbAllUsersProvider";
import { AllUsersContextType } from "../../providers/db/allUsers/types";

const useDBAllUsersContext = (): AllUsersContextType => {
  const context = useContext(DBAllUsersContext);

  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a useCurrentUserContext"
    );
  }
  return context;
};

export default useDBAllUsersContext;
