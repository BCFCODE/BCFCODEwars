import { useContext } from "react";
import { AllUsersDispatchContext } from "../../providers/AllUsers";
import { Dispatch } from "react";
import { AllUsersAction } from "../../reducers/allUsersReducer";


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
