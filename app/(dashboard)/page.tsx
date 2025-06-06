import { auth } from "@/auth";
import { Avatar, Box, Typography } from "@mui/material";

import DashboardStats from "./Stats";
import Welcome from "./Welcome";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <Box>
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
      </Welcome>
    </Box>
  );
}
