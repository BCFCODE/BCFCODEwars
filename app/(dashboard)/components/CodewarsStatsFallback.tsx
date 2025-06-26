import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const CodewarsStatsFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        touchAction: "pan-y",
        // overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        marginTop: 10
      }}
    >
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
        It looks like you haven’t solved any challenges yet or haven’t connected
        your Codewars account. Your stats are powered by the diamonds you
        collect from solving problems.
        {/* <br /> */}
        👉 If you haven’t connected yet, click <strong>Connect</strong> to link
        your account.
        {/* <br /> */}
        👉 If you&apos;re already connected, head over to the{" "}
        <strong>Leaderboard</strong>, click the arrow next to your avatar, and
        collect your diamonds to activate your stats.
      </Typography>
      {/* <Gauges /> */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          mt: 2,
        }}
      >
        <Link href="/leaderboard">
          <Button>Leaderboard</Button>
        </Link>
        <Link href="/wars">
          <Button>Connect</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CodewarsStatsFallback;
