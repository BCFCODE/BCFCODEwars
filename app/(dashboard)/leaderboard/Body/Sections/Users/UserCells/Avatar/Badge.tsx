import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "./styles";


interface Props {
  imageUrl: string;
}

const Badge = ({ imageUrl }: Props) => {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="User's Avatar" src={imageUrl} />
    </StyledBadge>
  );
};

export default Badge;
