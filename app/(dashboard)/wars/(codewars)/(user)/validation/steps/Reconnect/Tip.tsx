import { Link, Typography } from "@mui/material";
import React from "react";

const Tip = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mt: 2, textAlign: "center" }}
    >
      Tip: Want to update your clan, name, or username? Simply click{" "}
      <Link
        href="https://www.codewars.com/users/edit"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ fontWeight: 500 }}
      >
        here
      </Link>{" "}
      to make the change. After updating, come back here to reconnect your
      account and stay in sync.
    </Typography>
  );
};

export default Tip;
