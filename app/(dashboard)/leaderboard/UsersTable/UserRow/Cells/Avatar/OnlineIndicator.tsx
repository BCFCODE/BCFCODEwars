import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import Avatar from "@mui/material/Avatar";
import { StyledOnlineIndicator } from "./styles";

const OnlineIndicator = () => {
  const { currentUser } = useCurrentUserContext();

  return (
    <StyledOnlineIndicator
      sx={{ zIndex: 1 }}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="User's Avatar" src={currentUser.image ?? ""} />
    </StyledOnlineIndicator>
  );
};

export default OnlineIndicator;
