import { useContext } from "react";
import { AllUsersDispatchContext } from "../../providers/AllUsers";
import { Dispatch } from "react";
import { AllUsersAction } from "../../reducers/users/allUsers/types";

const useAllUsersDispatchContext = (): Dispatch<AllUsersAction> => {
  const context = useContext(AllUsersDispatchContext);
  if (!context) {
    throw new Error(
      "useAllUsersDispatchContext must be used within a AllUsersProvider"
    );
  }
  return context;
};

export default useAllUsersDispatchContext;
