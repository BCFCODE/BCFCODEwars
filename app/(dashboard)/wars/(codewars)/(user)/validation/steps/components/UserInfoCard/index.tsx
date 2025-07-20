"use client";

import { Box, Button, Paper, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CodewarsInfo from "./CodewarsInfo";
import Info from "./Info";
import WarningMessage from "../../Reconnect/WarningMessage";
import Tip from "../../Reconnect/Tip";
import ReconnectButton from "../../Reconnect/Buttons/Reconnect";

interface Props {
  codewarsUsername: string;
  codewarsHonor: number;
  codewarsLeaderboardPosition: number;
  codewarsClan: string;
  validatedUsername: string;
  isUsernameSynced?: boolean;
  overallRank: number;
}

const UserInfoCard = ({
  codewarsUsername,
  codewarsHonor,
  codewarsLeaderboardPosition,
  codewarsClan,
  validatedUsername,
  isUsernameSynced,
  overallRank,
}: Props) => {
  const [isMe, setIsMe] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const warningSx: SxProps = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "error.main",
  };

  const handleNotMeClick = () => {
    setIsMe(false);
    if (!isMe) setIsDisabled(false);
  };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          py: 2,
          px: 2.5,
          mt: 2,
          minHeight: 255,
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: "background.paper",
          boxShadow: 5,
          textAlign: "left",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Info or Warning */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {isUsernameSynced ? (
            isMe ? (
              <CodewarsInfo
                {...{
                  codewarsUsername,
                  codewarsHonor,
                  codewarsLeaderboardPosition,
                  codewarsClan,
                  validatedUsername,
                  overallRank,
                }}
              />
            ) : (
              <WarningMessage>
                <Typography sx={warningSx}>
                  Warning <br /> Reconnecting will permanently replace all your
                  current data with new information.
                </Typography>
              </WarningMessage>
            )
          ) : (
            <Typography
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                color: "warning.main",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              {isMe ? (
                <>
                  <Box sx={{ fontSize: "1.5rem", mb: 1 }} aria-label="warning">
                    ⚠️
                  </Box>
                  <Typography>
                    Hey <strong>{codewarsUsername}</strong>, your validated
                    username <strong>"{validatedUsername}"</strong> seems to be
                    missing or renamed.
                  </Typography>
                </>
              ) : (
                <WarningMessage>
                  <Typography sx={warningSx}>
                    Warning <br /> Reconnecting will erase all your current data
                    and replace it with the latest available info.
                  </Typography>
                </WarningMessage>
              )}
            </Typography>
          )}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-around",
            gap: 1,
          }}
        >
          <Link href="/leaderboard" passHref>
            <Button color="success" variant="contained">
              {isMe
                ? isUsernameSynced
                  ? "That's me"
                  : "No, go back"
                : "Go back"}
            </Button>
          </Link>

          <Button color="error" variant="outlined" onClick={handleNotMeClick}>
            {isMe
              ? isUsernameSynced
                ? "Who’s this? Not me!"
                : "You're right!"
              : "Delete my data"}
          </Button>
        </Box>
      </Paper>

      {/* Tip + Reconnect */}
      <Tip />
      <ReconnectButton disabled={isDisabled} />
    </>
  );
};

export default UserInfoCard;
