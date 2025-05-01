import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Message = () => {
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
        Youd&apos;re viewing **Version 0.3.0** — an exciting update packed with
        new features to fuel your coding journey! In this release, wed&apos;ve
        introduced powerful stats for your Codewars challenges, giving you
        daily, weekly, monthly, and yearly progress metrics.
        {/* <br /> */}
        <br />
        To get started, simply connect your Codewars account by clicking the
        button below. Once connected, head over to your **Dashboard** to see
        your progress and track your achievements.
        {/* <br /> */}
        <br />
        While the **Missions** and **Orders** sections are still under
        construction, the **Dashboard** is fully ready for Codewars users. Start
        tracking your progress now!
      </Typography>
      <Link href="/wars">
        <Button>Go to wars!</Button>
      </Link>
    </Box>
  );
};

export default Message;
