import { CodewarsDatabase, CodewarsUser } from "@/types/codewars";
import { Box, Paper, Typography } from "@mui/material";
import Buttons from "./Buttons";
import { auth } from "@/auth";

// import { useRouter } from "next/navigation";
interface Props {
  currentStep: number;
  validatedUsername: string;
}

const Step3 = async ({ currentStep, validatedUsername }: Props) => {
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${validatedUsername}`
  );

  const session = await auth();

  const codewars = await response.json();

  const codewarsDatabase: CodewarsDatabase = {
    codewars,
    email: session?.user.email,
  };

  return (
    <>
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
          information. If it’s not correct, go back and double-check to ensure
          the username is accurate!
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
            <strong>Honor:</strong> {codewars.honor}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
            }}
          >
            <strong>Overall Rank:</strong>{" "}
            {Math.abs(codewars.ranks.overall.rank).toString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              // mb: 1,
            }}
          >
            <strong>Name:</strong> {codewars.name ?? "N/A"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
            }}
          >
            <strong>Leaderboard Position:</strong>{" "}
            {codewars.leaderboardPosition ?? "N/A"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              // mb: 1,
            }}
          >
            <strong>Clan:</strong> {codewars.clan ?? "N/A"}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <Buttons
          codewars={codewarsDatabase}
          currentStep={Number(currentStep)}
        />
      </Box>
    </>
  );
};

export default Step3;
