"use client"; // Since Avatar is interactive, we still need this directive

import React from "react";
import { Avatar } from "@mui/material";
import { auth } from "@/auth";

const UserAvatar = ({ session }: { session: any }) => {
  if (!session || !session.user) {
    return null; // or a placeholder
  }

  return (
    <Avatar
      alt={session.user.name || ""}
      src={session.user.image}
      sx={{
        width: { xs: 100, sm: 120 }, // Responsive avatar size
        height: { xs: 100, sm: 120 },
        boxShadow: 8,
        border: "2px solid",
        borderColor: "grey.400",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
        },
        // mt: 3,
      }}
    />
  );
};

export default UserAvatar;

// Server-side data fetching
export async function getServerSideProps(context: any) {
  const session = await auth(context.req); // Pass request context if needed
  return {
    props: { session },
  };
}
