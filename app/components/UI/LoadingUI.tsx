"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  message: string;
}

const LoadingUI = ({ title, message }: Props) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "center",
      marginTop: 10
    }}
  >
    <Box
      sx={{
        position: "relative",
        width: 250,
        height: 250,
        borderRadius: "50%",
        overflow: "hidden", // clip overflow to keep shape
        boxShadow: `0 0 ${100}px ${30}px rgba(${0},${0},${0},${0.1})`,
        marginBottom: 3,
      }}
    >
      <iframe
        src="https://player.cloudinary.com/embed/?cloud_name=ds8pptoh2&public_id=BCFCODE_LOGO_motion_boeobd&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          pointerEvents: "none",
          display: "block",
          // no borderRadius on iframe, container clips
        }}
        allow="autoplay"
        loading="lazy"
        title="BCFCODE logo motion"
      />

      {/* Blur overlay to feather edges */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: `inset 0 0 ${80}px ${0}px rgba(${255},${255},${255},${0.5})`, // white glow inside edges
          // alternative for subtle feather:
          // background: "radial-gradient(circle, transparent 70%, rgba(255,255,255,0.6) 100%)"
        }}
      />
    </Box>
    <Box
      sx={{
        // position: "relative",
        height: 130,
        width: "100%",
        p: 2,
        overflow: "hidden", // clip anything outside box
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white", // text color for contrast
      }}
    >
      {/* Foreground content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          width: "100%",
        }}
      >
        <LinearProgress sx={{ width: "100%", mb: 2 }} color="secondary" />
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            transition: "font-size 1s",
            fontSize: { xs: "0.5rem", sm: "1rem", md: "1.3rem" },
            // fontWeight: "bold",
            textShadow: "0 0 8px rgba(0,0,0,0.7)",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            transition: "font-size 1s",
            fontSize: { xs: "0.4rem", sm: "0.8rem", md: "1rem" },
            textShadow: "0 0 6px rgba(0,0,0,0.5)",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default LoadingUI;
