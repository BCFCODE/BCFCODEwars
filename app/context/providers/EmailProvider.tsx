import { PropsWithChildren } from "react";
import { EmailContext } from "./contexts";

export interface Email {
  email: string;
}

export interface EmailProviderProps extends PropsWithChildren {
  context: Email;
}

/**
 * EmailProvider wraps components with EmailContext
 * and provides the required context value.
 */
const EmailProvider = ({ children, context }: EmailProviderProps) => {
  return (
    <EmailContext.Provider value={context}>{children}</EmailContext.Provider>
  );
};

export default EmailProvider;
