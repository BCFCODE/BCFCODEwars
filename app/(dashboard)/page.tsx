import { auth } from "@/auth";
import { Box } from "@mui/material";
import Grid from "@mui/system/Grid";
import DashboardStats from "./Stats";
import Welcome from "./Welcome";
import DiamondsCard from "./components/Cards/DiamondsCard";
import TargetCard from "./components/Cards/TargetCard";
import CodewarsCard from "./components/Cards/CodewarsCard";

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
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              size={{ xs: 24, sm: 24, md: 24, lg: 8 }}
            >
              <TargetCard email={session?.user?.email ?? ""} label="Target" />
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              size={{ xs: 24, sm: 12, md: 12, lg: 8 }}
            >
              <DiamondsCard
                email={session?.user?.email ?? ""}
                label="Diamonds"
              />
            </Grid>

            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              size={{ xs: 24, sm: 12, md: 12, lg: 8 }}
            >
              <CodewarsCard email={session?.user?.email ?? ""} label="Solved" />
            </Grid>
          </Grid>
        </Box>
      </Welcome>
    </Box>
  );
}
