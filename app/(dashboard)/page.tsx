import { auth } from "@/auth";
import { Box } from "@mui/material";
import Grid from "@mui/system/Grid";
import DashboardStats from "./Stats";
import Welcome from "./Welcome";
import DashboardCard from "./components/DashboardCard";

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={24}>
            <Grid size={{ xs: 24, md: 8 }}>
              <DashboardCard
                label="Diamonds"
                sx={{
                  p: 2,
                  minWidth: 300,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid size={{ xs: 24, md: 8 }}>
              <DashboardCard
                label="Position"
                sx={{
                  p: 2,
                  minWidth: 300,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid size={{ xs: 24, md: 8 }}>
              <DashboardCard
                label="Challenges"
                sx={{
                  p: 2,
                  minWidth: 300,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Welcome>
    </Box>
  );
}
