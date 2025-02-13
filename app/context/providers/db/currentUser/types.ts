import { DBUser } from "@/types/db/users";

type Context = {
  currentUser: DBUser;
};

export interface CurrentUserContextState extends Context {
  isCollapse?: boolean;
}
