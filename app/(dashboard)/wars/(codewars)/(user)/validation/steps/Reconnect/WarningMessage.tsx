import { Typography } from "@mui/material";

const WarningMessage = () => (
  <Typography
    component="span"
    sx={{ fontWeight: "bold", color: "error.main", display: "block", mt: 1 }}
  >
    ⚠️ Warning: If you reconnect, all your existing data in our database will be
    erased and replaced with the new information. Please proceed with caution!
  </Typography>
);

export default WarningMessage;
