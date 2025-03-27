import { Box, Paper } from "@mui/material";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import ReconnectButton from "./Buttons/Reconnect";
import Message from "./Message";
import Tip from "./Tip";

const Reconnect = ({
  session,
  codewars,
  validatedUsername,
  isDbUsernameSyncedWithCodewars,
}: Omit<StepProps, "currentStep">) => {
  const userName = session?.user?.name.split(" ")[0] || "User";
  const isSynced = isDbUsernameSyncedWithCodewars ?? false;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
          px: 3,
          pt: 5,
          mt: -5,
        }}
      >
        {/* Main Content */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: "600px",
            textAlign: "center",
            backgroundColor: "background.default",
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <Message {...{ userName, isSynced }} />

          {/* User Info */}
          <UserInfoCard
            {...{
              userName,
              codewars,
              validatedUsername,
              isDbUsernameSyncedWithCodewars,
            }}
          />

          {/* Tip Section */}
          <Tip />

          {/* Reconnect Button */}
          <ReconnectButton />
        </Paper>
      </Box>
    </Box>
  );
};

export default Reconnect;
