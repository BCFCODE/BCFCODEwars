import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { UserRole } from "@/types/users";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, TableCell, Tooltip } from "@mui/material";
import Name from "./Name";
import OnlineIndicator from "./OnlineIndicator";
import OpenWebsiteIfAvailable from "./OpenWebsiteIfAvailable";

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
          <OnlineIndicator />
          {role === UserRole.SuperAdmin && (
            <Tooltip sx={{ position: "absolute", top: 0 }} title="Super Admin">
              <VerifiedUserIcon
                fontSize="small"
                sx={{
                  position: "absolute",
                  color: "#FFD700", // classic gold color
                  filter: "drop-shadow(0 0 4px #FFC107)", // subtle glowing effect
                  top: 0,
                  right: -4,
                  // fontSize: 20, // bigger icon for emphasis
                }}
              />
            </Tooltip>
          )}
        </Box>
      </OpenWebsiteIfAvailable>
      <Name text={name} />
    </TableCell>
  );
}
