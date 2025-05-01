import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  message: string;
}

const LoadingUI = ({ title, message }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: 2,
      }}
    >
      <LinearProgress sx={{ width: "100%", marginBottom: 2 }} />
      <Typography
        variant="h5"
        color="text.primary"
        sx={{
          fontSize: {
            xs: "0.5rem",
            sm: "1rem",
            md: "1.3rem", 
            // lg: '1.75rem',// 28px
            // xl: '2rem',   // 32px
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          marginTop: 1,
          fontSize: {
            xs: "0.4rem",
            sm: "0.8rem",
            md: "1.3rem",
          },
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingUI;
