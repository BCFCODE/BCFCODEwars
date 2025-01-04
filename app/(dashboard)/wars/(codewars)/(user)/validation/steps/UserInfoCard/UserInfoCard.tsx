"use client";

import { Paper, Typography, Box } from "@mui/material";
import { StepProps } from "../stepSwitch";

const UserInfoCard = ({
  codewars,
  validatedUsername,
}: Pick<StepProps, "codewars" | "validatedUsername">) => {
  const overallRank = Math.abs(Number(codewars?.ranks.overall.rank)).toString();

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2.5,
        // mt: 2,
        maxWidth: "400px",
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: 5,
        textAlign: "left",
        margin: "auto",
      }}
    >
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
    </Paper>
  );
};

export default UserInfoCard;
