import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Message = () => {
  const version = "0.3.3";

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.5rem", sm: "0.7rem" },
          maxWidth: 700,
          textAlign: "center",
          color: "text.secondary",
          fontWeight: 400,
          lineHeight: 1.6,
          opacity: 0.85,
        }}
      >
        You&apos;re viewing <strong>Version {version}</strong> — a thrilling update
        that puts performance, personalization, and progress at your fingertips!
        💥
        <br />
        <br />
        🚀 <strong>What&apos;s New?</strong>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.5rem", sm: "0.7rem" },
          maxWidth: 700,
          textAlign: "left",
          color: "text.secondary",
          fontWeight: 400,
          lineHeight: 1.6,
          opacity: 0.85,
        }}
      >
        <br />
        🔹 We&apos;ve introduced <strong>independent pagination</strong> for each
        user&apos;s Codewars challenges — now you can explore your challenge history
        without affecting others.
        <br />
        🔹 Your pagination state (page, rows per page) is now stored{" "}
        <strong>offline</strong> — return right where you left off, even after
        reloading or revisiting the app.
        <br />
        🔹 A smoother, more responsive UI experience with collapsible sections
        optimized for usability.
        <br />
        🔹 And as always, improvements under the hood to make things faster and
        more reliable.
        <br />
        <br />
        To experience it all, connect your Codewars account by clicking below
        and head to your <strong>Dashboard</strong> to see personalized stats
        and track your growth like never before.
        <br />
        <br />
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.5rem", sm: "0.7rem" },
          maxWidth: 700,
          textAlign: "center",
          color: "text.secondary",
          fontWeight: 400,
          lineHeight: 1.6,
          opacity: 0.85,
        }}
      >
        <em>Note:</em> Our <strong>Missions</strong> and <strong>Orders</strong>
        features are still under construction — stay tuned for even more
        powerful tools in upcoming versions!
      </Typography>
      <Link href="/wars">
        <Button>Go to wars!</Button>
      </Link>
    </Box>
  );
};

export default Message;
