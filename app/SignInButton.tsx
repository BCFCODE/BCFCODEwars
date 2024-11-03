"use client";

import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login"; // New icon for sign in
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const SignInButton: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const theme = useTheme();

  const handleClick = async () => {
    setLoading(true);
    // Simulate sign-in logic (replace with actual logic)
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setLoading(false);
  };

  return (
    <Link href="/auth/signin" passHref>
      <Button
        variant="outlined"
        color="primary"
        startIcon={
          loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <LoginIcon />
          )
        } // Updated icon
        onClick={handleClick}
        disabled={loading}
        sx={{
          // borderRadius: "8px",
          // padding: "10px 20px",
          // boxShadow: 3,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 5,
            // backgroundColor: theme.palette.primary.dark, // Darken on hover
          },
          "&:disabled": {
            backgroundColor: theme.palette.action.disabled,
            color: theme.palette.text.disabled,
          },
        }}
        aria-label="Sign in"
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </Link>
  );
};

export default SignInButton;
