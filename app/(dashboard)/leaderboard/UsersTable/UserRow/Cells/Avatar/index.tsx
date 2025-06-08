import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { UserRole } from "@/types/users";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, TableCell, Tooltip } from "@mui/material";
import Name from "./Name";
import OnlineIndicator from "./OnlineIndicator";
import OpenWebsiteIfAvailable from "./OpenWebsiteIfAvailable";
import RoleBadge from "./RoleBadge";

export default function AvatarCell() {
  const {
    currentUser: { name, role },
  } = useCurrentUserContext();

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
      <Name text={name} />
    </TableCell>
  );
}
