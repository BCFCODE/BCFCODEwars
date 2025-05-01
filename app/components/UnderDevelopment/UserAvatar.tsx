import { Avatar } from "@mui/material";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
}

const UserAvatar = ({ session }: Props) => {
  return (
    <>
      {session?.user?.image && (
        <Avatar
          alt={session?.user?.name || ""}
          src={session?.user?.image}
          sx={{
            width: { xs: 100, sm: 120 }, // Responsive avatar size
            height: { xs: 100, sm: 120 },
            mb: 3,
            boxShadow: 8, // Deep shadow for visual separation
            border: "2px solid", // Adding a border for distinction
            borderColor: "grey.400", // Neutral border color
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)", // Subtle hover effect to add interaction
            },
          }}
        />
      )}
    </>
  );
};

export default UserAvatar;
