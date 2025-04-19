import { Box, Paper } from "@mui/material";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import ReconnectButton from "./Buttons/Reconnect";
import Message from "./Message";
import Tip from "./Tip";
import GoToLeaderboard from "./Buttons/GoToLeaderboard";

const Reconnect = ({
  session,
  codewars,
  validatedUsername,
  isUsernameSynced,
}: Omit<StepProps, "currentStep">) => {
  const userName = (session?.user?.name ?? "").split(" ")[0] || "User";
  const isSynced = isUsernameSynced ?? false;

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
              isUsernameSynced,
            }}
          />

          {/* Tip Section */}
          <Tip />

          {/* Reconnect Button */}
          <Box sx={{ display: "flex", justifyContent: "space-around", gap: 1 }}>
            <GoToLeaderboard />
            <ReconnectButton />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Reconnect;
