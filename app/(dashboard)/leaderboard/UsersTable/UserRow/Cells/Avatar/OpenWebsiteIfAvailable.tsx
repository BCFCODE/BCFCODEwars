import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import React, { PropsWithChildren } from "react";
import OnlineIndicator from "./OnlineIndicator";

interface Props extends PropsWithChildren {}

const OpenWebsiteIfAvailable = ({ children }: Props) => {
  const { currentUser } = useCurrentUserContext();

  if (!currentUser.websiteUrl) return <OnlineIndicator />;

  return (
    <a href={currentUser.websiteUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default OpenWebsiteIfAvailable;
