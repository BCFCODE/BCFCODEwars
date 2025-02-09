import { DBUser } from "@/types/db/users";

export interface CurrentUserContextType {
  currentUser: DBUser;
  // allUsers: DBUser[];
}
