
import { Typography } from "@mui/material";
import WarningMessage from "./WarningMessage";

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
        You’re currently connected as {userName}. If that’s incorrect, feel free
        to reconnect and update your username.
        <WarningMessage />
      </Typography>
    );

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
      No worries—you can easily reconnect and revalidate your new username. This
      helps us keep your data accurate and up to date.
      <WarningMessage />
    </Typography>
  );
};

export default Message;
