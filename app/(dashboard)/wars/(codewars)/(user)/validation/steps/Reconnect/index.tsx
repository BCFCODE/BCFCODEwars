import { Box, Paper } from "@mui/material";

import { StepProps } from "../components/Steps/stepSwitch";
import UserInfoCard from "../components/UserInfoCard";
import ReconnectButton from "./Buttons/Reconnect";
import Tip from "./Tip";

const Reconnect = ({
  codewars,
  validatedUsername,
  isUsernameSynced,
}: Omit<StepProps, "currentStep">) => {
  return (
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
        {/* <Message {...{ userName, isSynced }} /> */}

        {/* User Info */}
        <UserInfoCard
          codewarsUsername={codewars.name ?? "N/A"}
          codewarsHonor={codewars.honor ?? 0}
          validatedUsername={validatedUsername ?? "User"}
          codewarsLeaderboardPosition={codewars.leaderboardPosition ?? 0}
          codewarsClan={codewars.clan ?? "N/A"}
          isUsernameSynced={isUsernameSynced}
          overallRank={Math.abs(Number(codewars?.ranks?.overall.rank))}
        />
      </Paper>
    </Box>
  );
};

export default Reconnect;
