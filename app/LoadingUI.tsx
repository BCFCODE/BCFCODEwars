import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface Props {
  head: string;
  body: string;
}

const LoadingUI = ({ head, body }: Props) => {
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
        {head}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        {body}
      </Typography>
    </Box>
  );
};

export default LoadingUI;
