import { AuthenticatedUser } from "@/types/users";
import { SxProps, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

interface Props {
  sx?: SxProps;
  totalUsers: number;
  list: Pick<AuthenticatedUser, "name" | "image" | "email">[];
}

export default function OnlineUsers({ sx, totalUsers, list }: Props) {
  return (
    <AvatarGroup
      key={list.length}
      sx={sx}
      renderSurplus={(surplus) =>
        surplus > 1000 ? <span>+{surplus.toString()[0]}k</span> : surplus
      }
      total={totalUsers}
    >
      {list.map(({ name, email, image }) => (
        <Tooltip title={name}>
          <Avatar key={email} alt={name} src={image} />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
}
