import { AuthenticatedUser } from "@/types/users";
import { createContext, useContext } from "react";

export const CurrentUserContext = createContext<AuthenticatedUser | null>(null);

export const useCurrentUser = (): AuthenticatedUser => {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error("useCurrentUser must be withing a CurrentUserProvider");
  return context;
};
