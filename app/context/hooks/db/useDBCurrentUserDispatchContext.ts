import { Dispatch, useContext } from "react";
import { CurrentUserAction } from "../../reducers/users/currentUser/types";
import { CurrentUserActionContext } from "../../providers/db/currentUser/dbCurrentUserProvider";

const useDBCurrentUserActionContext = (): Dispatch<CurrentUserAction> => {
  const context = useContext(CurrentUserActionContext);
  if (!context) {
    throw new Error(
      "useDBCurrentUserActionContext must be used within a useDBCurrentUserActionContext"
    );
  }
  return context;
};

export default useDBCurrentUserActionContext;
