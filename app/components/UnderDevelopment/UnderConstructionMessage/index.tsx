import { Box } from "@mui/material";
import Header from "./Header";
import Message from "./Message";

const UnderConstructionMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper", // Neutral background for professional feel
        color: "text.primary", // Maintain text color contrast
        p: { xs: 1, sm: 2 }, // Adjust padding based on screen size
        mb: 4,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3, // Adding more depth for a more elevated look
      }}
    >
      <Header />
      <Message />
    </Box>
  );
};

export default UnderConstructionMessage;
