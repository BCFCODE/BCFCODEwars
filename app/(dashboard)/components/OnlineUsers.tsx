import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { SxProps } from "@mui/material";
import usePaginationQuery from "../leaderboard/UsersTable/Pagination/usePaginationQuery";

interface Props {
  sx?: SxProps;
  totalUsers: number;
}

export default function OnlineUsers({ sx, totalUsers  }: Props) {
  return (
    <AvatarGroup
      sx={sx}
      renderSurplus={(surplus) =>
        surplus > 1000 ? <span>+{surplus.toString()[0]}k</span> : surplus
      }
      total={totalUsers}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png"
      />
      <Avatar
        alt="Travis Howard"
        src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png"
      />
      <Avatar
        alt="Agnes Walker"
        src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png"
      />
      <Avatar
        alt="Trevor Henderson"
        src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png"
      />
    </AvatarGroup>
  );
}
