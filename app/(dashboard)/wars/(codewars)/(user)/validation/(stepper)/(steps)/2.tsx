"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import UserAvatar from "../(content)/UserAvatar";

export default function Step2() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateUsername = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/codewars/users/validation?username=${username}`
      );
      const data = await response.json();
      // console.log(data, response, "<<<<<<<<<<");

      if (response.ok) {
        setSuccess(`Username "${username}" is valid!`);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch {
      setError("Unable to validate the username. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <UserAvatar />
  <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center", mt: 4 }}>
      
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
        helperText={error || ""}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={validateUsername}
        disabled={loading || !username.trim()}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Validate Username"
        )}
      </Button>
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
    </Box>
  </>
  );
}
