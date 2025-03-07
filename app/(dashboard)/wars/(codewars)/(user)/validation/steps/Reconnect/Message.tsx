import { auth } from "@/auth";
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  userName: string;
  isSynced: boolean;
}

const Message = async ({ isSynced, userName }: Props) => {
  if (isSynced)
    return (
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          color: "text.secondary",
          textAlign: "left",
        }}
      >
        It looks like you're already connected as {userName}. If that's not
        right, you can reconnect and update your username for a smoother
        experience!
      </Typography>
    );

  if (!isSynced)
    return (
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          textAlign: "left",
          lineHeight: 1.6,
          mt: 2,
        }}
      >
        No worries—you can easily reconnect and revalidate your new username.
        This helps us keep your data accurate and up to date.
      </Typography>
    );
};

export default Message;
