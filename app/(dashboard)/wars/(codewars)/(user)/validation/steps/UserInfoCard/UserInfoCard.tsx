// "use client";

import { CodewarsUser } from "@/types/codewars";
import { Box, Paper, Typography } from "@mui/material";

interface Props {
  codewars: CodewarsUser;
  validatedUsername: string;
  isUsernameSynced: boolean | undefined;
}

const UserInfoCard = ({
  codewars,
  validatedUsername,
  isUsernameSynced,
}: Props) => {
  const overallRank = Math.abs(
    Number(codewars?.ranks?.overall.rank)
  ).toString();
  const userName = codewars?.name?.split(" ")[0] || "User";
  return (
    <Paper
      elevation={4}
      sx={{
        py: 2,
        px: 2.5,
        mt: 2,
        maxWidth: "400px",
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: 5,
        textAlign: "left",
        margin: "10px auto ",
      }}
    >
      {isUsernameSynced ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            <strong>User Name:</strong> {validatedUsername}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            <strong>Honor:</strong> {codewars?.honor}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            <strong>Overall Rank:</strong> {overallRank}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            <strong>Name:</strong> {codewars?.name ?? "N/A"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            <strong>Leaderboard Position:</strong>{" "}
            {codewars?.leaderboardPosition ?? "N/A"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            <strong>Clan:</strong> {codewars?.clan ?? "N/A"}
          </Typography>
        </Box>
      ) : (
        <Typography
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "warning.main",
            fontWeight: 600,
            fontSize: "1rem",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <Box
            component="span"
            sx={{
              mr: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // flexDirection: "column",
              fontSize: "1.2rem",
            }}
          >
            ⚠️
          </Box>
          <Typography>
            {" "}
            Oh, {userName}! It seems that your username{" "}
            <strong>&quot;{validatedUsername}&quot;</strong> has either been
            changed or deleted.
          </Typography>
        </Typography>
      )}
    </Paper>
  );
};

export default UserInfoCard;
