import { Box, TableCell, Typography } from "@mui/material";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import Name from "./Name";
import Avatar from "@mui/material/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import OpenWebsiteIfAvailable from "./OpenWebsiteIfAvailable";
import RoleBadge from "./RoleBadge";
import PulseAnimation from "@/app/(dashboard)/animations/Pulse";

export default function AvatarCell() {
  const { currentUser } = useCurrentUserContext();

  return (
    <TableCell
      sx={{
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 1,
        paddingLeft: { xs: 4, md: 2 },
        position: "relative",
      }}
      component="th"
      scope="row"
    >
      <OpenWebsiteIfAvailable>
        <Box sx={{ position: "relative" }}>
          <RoleBadge />
          <OnlineIndicator />
        </Box>
      </OpenWebsiteIfAvailable>
      <Name text={currentUser.name} />
      <PulseAnimation
        sx={{ position: "absolute", left: 65, top: 45 }}
        pulseColor="yellowgreen"
      >
        <Typography sx={{ fontSize: 8, fontWeight: 500 }} color="success.main">
          - Online ...
        </Typography>
      </PulseAnimation>
    </TableCell>
  );
}
