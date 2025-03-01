import { CurrentUser } from "@/types/db/users";

export type CurrentUserContext = {
  currentUser: CurrentUser;
};

export interface CurrentUserContextState extends CurrentUserContext {
  isCollapse?: boolean;
}
