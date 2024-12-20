import React, { useEffect, useState } from 'react';
import { auth } from "@/auth";
import { Avatar } from "@mui/material";

const UserAvatar = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  if (!session) {
    return null; // or a loading indicator
  }

  return (
    <>
      {session?.user?.image && (
        <Avatar
          alt={session?.user?.name || ""}
          src={session?.user?.image}
          sx={{
            width: { xs: 100, sm: 120 }, // Responsive avatar size
            height: { xs: 100, sm: 120 },
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
