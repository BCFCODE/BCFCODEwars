import DatabaseService from "@/app/services/db";
import { auth } from "@/auth";
import { CodewarsUser } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import { Box, Button, Fade, Typography } from "@mui/material";
import Link from "next/link";
import Reconnect from "./(codewars)/(user)/validation/steps/Reconnect";
import { StepProps } from "./(codewars)/(user)/validation/steps/stepSwitch";
import UserAvatar from "./(codewars)/(user)/validation/steps/UserAvatar";

const { getSingleCodewarsUser } = new DatabaseService();

const WarsPage = async () => {
  const session = await auth();
  const email = session?.user?.email;

  // const { currentUser } = useCurrentUserContext();

  let isConnected = false;

  let reconnectProps: Omit<StepProps, "currentStep"> = {
    codewars: {} as CodewarsUser,
    validatedUsername: "",
    session: session || null,
    isUsernameSynced: true,
  };

  if (email) {
    try {
      const currentCodewarsUser = await getSingleCodewarsUser(email);
      // console.log(currentCodewarsUser, "<<<<<< currentCodewarsUser");
      /* Purpose: 
          This block of code checks if the Codewars account associated with the user 
          (stored in our database) is in sync with the current state on Codewars.com. 
          Specifically, it validates whether the username on Codewars.com matches 
          the username stored in our database. If a mismatch is detected, the user 
          will be guided to reconnect and revalidate their updated username.

        Step-by-step:
          1. Retrieve the user's record from the database using their email address.
          2. Fetch the latest Codewars user data from our API, which queries Codewars.com,
            using the stored Codewars username.
          3. Determine synchronization status (`isUsernameSynced`) based on the success 
            property returned by the Codewars API response.
          4. Update the `isConnected` status by checking if the user is already marked 
            as connected in the database OR if the Codewars data is successfully synced.
          5. Prepare `reconnectProps` to guide the user through the reconnection process 
            if their username is found to have changed, including:
            - Current Codewars data from the database
            - The last validated username
            - The current session object for context.

        Why it matters: 
          Ensuring the Codewars username in our database is up-to-date prevents inconsistencies 
          in leaderboard functionality, user progress tracking, or other dependent features. 
          This mechanism ensures a seamless experience while providing a clear path to resolve any discrepancies. 
      */

      const response = await fetch(
        `${baseURL}/api/wars/codewars/user?username=${currentCodewarsUser?.username}`
      );
      const codewarsUser: CodewarsUser = await response.json();

      const isUsernameSynced = codewarsUser.success;
      // console.log(
      //   currentCodewarsUser?.isConnected,
      //   isUsernameSynced
      // );
      const isDbUsernameSyncedWithCodewars = codewarsUser.success;
      // console.log(
      //   `currentCodewarsUser?.isConnected,
      //   isDbUsernameSyncedWithCodewars`,
      //   currentCodewarsUser?.isConnected,
      //   isDbUsernameSyncedWithCodewars
      // );
      isConnected =
        currentCodewarsUser?.isConnected || !isUsernameSynced || false;

      reconnectProps = {
        codewars: currentCodewarsUser ?? ({} as CodewarsUser),
        validatedUsername: currentCodewarsUser?.username ?? "",
        session,
        isUsernameSynced,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  // console.log("isConnected (wars page)", isConnected);
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
  return <Reconnect {...reconnectProps} />;
};

export default WarsPage;
