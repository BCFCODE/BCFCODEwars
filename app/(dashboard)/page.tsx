// app/(dashboard)/page.tsx
import { Box } from "@mui/material";
import UnderDevelopment from "./UnderDevelopment";
import DashboardStats from "./Stats";

export default async function HomePage() {
  return (
    <Box>
      <DashboardStats />
      <UnderDevelopment pageName="Dashboard" />
    </Box>
  );
}
