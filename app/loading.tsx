import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <LinearProgress sx={{ width: "100%", marginBottom: 2 }} />
      <Typography variant="h5" color="text.primary">
        Welcome to BCFCODEwars
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        Loading your experience...
      </Typography>
    </Box>
  );
};

export default Loading;
