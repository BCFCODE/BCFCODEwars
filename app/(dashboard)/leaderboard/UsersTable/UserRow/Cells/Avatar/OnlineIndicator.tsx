import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import Avatar from "@mui/material/Avatar";
import { PropsWithChildren } from "react";
import { StyledOnlineIndicator } from "./styles";

interface Props extends PropsWithChildren {}

const OnlineIndicator = ({ children }: Props) => {
  const {
    currentUser: { image, name, role, websiteUrl },
  } = useCurrentUserContext();

  return (
    <StyledOnlineIndicator
      sx={{ zIndex: 1 }}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="User's Avatar" src={image ?? ""} />
    </StyledOnlineIndicator>
  );
};

export default OnlineIndicator;
