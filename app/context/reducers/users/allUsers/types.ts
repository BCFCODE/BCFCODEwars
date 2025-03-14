import { AllUsersContextType } from "@/app/context/providers/db/allUsers/types";

export type AllUsersState = AllUsersContextType;

export type Action =
  | { type: "SET_ALL_USERS"; payload: AllUsersState }
  | { type: "SET_ERROR"; error: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SHOW_COLLECT_SWITCH"; isCollectSwitchVisible: boolean };
