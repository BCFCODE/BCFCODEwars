import { auth } from "@/auth";
import clientPromise from "@/lib/MongoDB/database";
import { Box, Button, Fade, Typography } from "@mui/material";
import Link from "next/link";
import UserAvatar from "./(codewars)/(user)/validation/steps/UserAvatar";
import { DatabaseUser } from "@/types/database";

const WarsPage = async () => {
  const session = await auth();
  const email = session?.user?.email;

  let isConnected = false;

  if (email) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const user = await db.collection("users").findOne({ email });
      isConnected = user?.codewars.isConnected;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  if (!isConnected)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          bgcolor: "background.default",
          color: "text.primary",
          p: { xs: 3, sm: 5 },
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Header Section */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 3,
            color: "text.primary",
          }}
        >
          Welcome to BCFCODE Wars
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          {session?.user?.name || "Hello, User!"}
        </Typography>

        {/* User Avatar */}
        <UserAvatar session={session} />

        {/* Main Message */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mb: 4,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            It looks like this is your first time connecting your Codewars
            profile. 🎉
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Let’s link your account to start climbing the leaderboard and
            showcase your coding skills! 🚀
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Don’t have a Codewars account yet? No worries!{" "}
            <Link href="https://www.codewars.com/users/sign_in" target="_blank">
              <strong>Sign up here</strong>
            </Link>{" "}
            to sharpen your skills through fun, challenging problem-solving.
            Then, come back and hit the button below to get started.
          </Typography>
          <Button
            component={Link}
            href="/wars/validation/steps/0"
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              transition: "font-size 0.5s",
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
                md: "1rem",
                lg: "1.2rem",
              },
              mb: 3,
            }}
          >
            Connect My Codewars Account
          </Button>
          {/* Inspirational Text */}
          <Fade in timeout={1000}>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontStyle: "italic",
                fontWeight: 500,
                opacity: 0.8,
              }}
            >
              Unlock personalized insights, stats, and milestones to inspire
              your coding journey!
            </Typography>
          </Fade>
        </Box>
      </Box>
    );

  // Render other content if the user is already connected
  return <div>Other content for connected users...</div>;
};

export default WarsPage;
