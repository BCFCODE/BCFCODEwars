import PulseAnimation from "@/app/(dashboard)/animations/Pulse";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { Box, TableCell, Typography } from "@mui/material";
import Name from "./Name";
import OnlineIndicator from "./OnlineIndicator";
import OpenWebsiteIfAvailable from "./OpenWebsiteIfAvailable";
import RoleBadge from "./RoleBadge";

export default function AvatarCell() {
  const { currentUser } = useCurrentUserContext();

  const lastActivity = new Date(
    currentUser.activity.lastActiveTime ?? currentUser.lastLogin
  );

  const isIdle = currentUser.activity.isIdle;

  const textStatus = isIdle
    ? `Last active: ${lastActivity.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "Online";

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
        sx={{ position: "absolute", left: { xs: 80, md: 65 }, top: 45 }}
        pulseColor="yellowgreen"
      >
        <PulseAnimation disabled={!isIdle} pulseColor="yellowgreen">
          <Typography
            sx={{ opacity: isIdle ? 0.8 : 1 }}
            variant="caption"
            color={isIdle ? "text.secondary" : "success.main"}
            fontWeight={isIdle ? 400 : 500}
          >
            {textStatus}
          </Typography>
        </PulseAnimation>
      </PulseAnimation>
    </TableCell>
  );
}
