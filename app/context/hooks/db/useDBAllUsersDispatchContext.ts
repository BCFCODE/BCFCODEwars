import { useContext } from "react";
import { AllUsersDispatchContext } from "../../providers/db/allUsers/AllUsersProvider";
import { Dispatch } from "react";
import { AllUsersAction } from "../../reducers/users/allUsers/types";

const useDBAllUsersDispatchContext = (): Dispatch<AllUsersAction> => {
  const context = useContext(AllUsersDispatchContext);
  if (!context) {
    throw new Error(
      "useDBAllUsersDispatchContext must be used within a AllUsersProvider"
    );
  }
  return context;
};

export default useDBAllUsersDispatchContext;
