import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const UserAvatar = () => {
  const { data: session } = useSession();
  return (
    <>
      {" "}
      {/* User Avatar */}
      {session?.user?.image && (
        <Avatar
          alt={session?.user?.name || ""}
          src={session?.user?.image}
          sx={{
            width: { xs: 100, sm: 120 }, // Responsive avatar size
            height: { xs: 100, sm: 120 },
            // mb: 3,
            boxShadow: 8, // Deep shadow for visual separation
            border: "2px solid", // Adding a border for distinction
            borderColor: "grey.400", // Neutral border color
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)", // Subtle hover effect to add interaction
            },
            mt: 3,
          }}
        />
      )}
    </>
  );
};

export default UserAvatar;
