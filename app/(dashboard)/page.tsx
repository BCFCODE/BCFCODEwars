import { auth } from "@/auth";
import { Box } from "@mui/material";

import DashboardStats from "./Stats";
import Welcome from "./Welcome";
import DashboardCard from "./components/DashboardCard";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <Box >
      <Welcome
        {...{
          pageName: "Dashboard",
          user: {
            name: session?.user?.name ?? "User",
            email: session?.user?.email ?? "",
            image: session?.user?.image ?? "",
          },
        }}
      >

        <DashboardStats />
        <Box sx={{ display: "flex", gap: 2 }}>
          <DashboardCard
            sx={{
              p: 2,
              minWidth: 300,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              borderRadius: 2,
            }}
          />
          <DashboardCard
            sx={{
              p: 2,
              minWidth: 300,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              borderRadius: 2,
            }}
          />
          <DashboardCard
            sx={{
              p: 2,
              minWidth: 300,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              borderRadius: 2,
            }}
          />
        </Box>
        
      </Welcome>
    </Box>
  );
}
