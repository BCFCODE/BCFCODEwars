import { auth } from "@/auth";
import { Box } from "@mui/material";
import HeaderMessage from "./HeaderMessage";
import InspirationalText from "./InspirationalText";
import UnderConstructionMessage from "./UnderConstructionMessage";
import UserAvatar from "./UserAvatar";

interface Props {
  pageName: string;
}

const UnderDevelopment = async ({ pageName }: Props) => {
  const session = await auth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%", // Full height of the screen
        bgcolor: "background.default", // Neutral background color
        color: "text.primary", // Primary text color for readability
        p: { xs: 3, sm: 5 }, // Responsive padding (smaller on mobile)
        boxShadow: 3, // Subtle shadow for depth
        borderRadius: 2, // Rounded corners for a modern feel
      }}
    >
      <HeaderMessage session={session} pageName={pageName} />
      <UserAvatar session={session} />
      <UnderConstructionMessage />
      <InspirationalText session={session} />
    </Box>
  );
};

export default UnderDevelopment;
