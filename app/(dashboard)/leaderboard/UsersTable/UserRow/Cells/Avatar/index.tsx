import { Box, TableCell } from "@mui/material";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import Name from "./Name";
import Avatar from "@mui/material/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import OpenWebsiteIfAvailable from "./OpenWebsiteIfAvailable";
import RoleBadge from "./RoleBadge";

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
    </TableCell>
  );
}
