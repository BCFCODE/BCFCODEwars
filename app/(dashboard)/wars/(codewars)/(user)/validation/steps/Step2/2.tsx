"use client";

import { Box, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
// import UserAvatar from "../(content)/UserAvatar";
import { useRouter } from "next/navigation";
import ValidationButton from "./ValidationButton";
import Buttons from "./Buttons";
import { baseURL } from "@/utils/constants";

interface Props {
  currentStep: number;
}

export default function Step2({ currentStep }: Props) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateUsername = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${baseURL}/api/codewars/user?username=${username}`,
        { cache: "no-store" }
      );
      const data = await response.json();
  

      if (response.ok) {
        setSuccess(`Username "${username}" is valid!`);
        router.push(`2?username=${username}`);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch {
      setError("Unable to validate the username. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <UserAvatar session={undefined}/> */}
      <Box
        sx={{
          width: 400,
          margin: "0 auto",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: "600px",
            textAlign: "center",
            backgroundColor: "background.default",
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          {" "}
          <Typography variant="h5" gutterBottom>
            Connect to Codewars
          </Typography>
          <TextField
            label="Codewars Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
            // helperText={error || ""}
            sx={{ mb: 2 }}
          />
          {/* Validation Button */}
          <ValidationButton {...{ loading, username, validateUsername }} />
          {success && (
            <Typography variant="body1" color="green" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          {error && (
            <Typography variant="body1" color="red" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {/* Tip Section */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "left" }}
          >
            Tip: If you already have an account, you can find your Codewars
            username{" "}
            <Link
              href="https://www.codewars.com/users/edit"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 500 }}
            >
              here
            </Link>
            . If you don&apos;t have a Codewars account yet,{" "}
            <Link href="https://www.codewars.com/users/sign_in" target="_blank">
              sign up here
            </Link>{" "}
            to get started.
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <Buttons currentStep={Number(currentStep)} />
      </Box>
    </>
  );
}
