import { CodewarsUser } from "@/types/codewars";
import { Box, Paper, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
interface Props {
  validatedUsername: string;
}

const Step3 = async ({ validatedUsername }: Props) => {
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${validatedUsername}`
  );

  const codewarsUser: CodewarsUser = await response.json();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
        px: 3, // Padding for responsiveness
        py: 4,
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          letterSpacing: 1.2,
        }}
      >
        Is this you?
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.6,
          maxWidth: "600px",
        }}
      >
        Confirm to update your username on the leaderboard based on this
        information. If it’s not correct, go back and double-check to ensure the
        username is accurate!
      </Typography>

      {/* User Info */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          maxWidth: "400px",
          borderRadius: 2,
          backgroundColor: "background.paper",
          textAlign: "left",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            // mb: 1,
          }}
        >
          <strong>User Name:</strong> {validatedUsername}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          <strong>Honor:</strong> {codewarsUser.honor}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          <strong>Overall Rank:</strong>{" "}
          {Math.abs(codewarsUser.ranks.overall.rank).toString()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            // mb: 1,
          }}
        >
          <strong>Name:</strong> {codewarsUser.name ?? "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          <strong>Leaderboard Position:</strong>{" "}
          {codewarsUser.leaderboardPosition ?? "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            // mb: 1,
          }}
        >
          <strong>Clan:</strong> {codewarsUser.clan ?? "N/A"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Step3;
