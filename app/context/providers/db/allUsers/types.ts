import { CurrentUser, DBUser } from "@/types/db/users";

export interface AllUsersContextType {
  isLoading: boolean;
  error: boolean;
  isCollectSwitchVisible: boolean;
  allUsers: CurrentUser[];
}
