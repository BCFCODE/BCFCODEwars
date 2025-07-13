import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { royalGold } from "@/theme";
import { UserRole } from "@/types/users";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Tooltip } from "@mui/material";

const RoleBadge = () => {
  const { currentUser } = useCurrentUserContext();

  if (currentUser.role === UserRole.SuperAdmin)
    return (
      <Tooltip
        sx={{ zIndex: 10, position: "absolute", top: 0 }}
        title={UserRole.SuperAdmin ? "Super Admin" : ""}
      >
        <VerifiedUserIcon
          // fontSize="small"
          sx={{
            position: "absolute",
            color: royalGold, // classic gold color
            filter: `drop-shadow(0 0 4px ${royalGold})`, // subtle glowing effect
            top: 1,
            right: 0,
            zIndex: 2,
            fontSize: 12, // bigger icon for emphasis
          }}
        />
      </Tooltip>
    );

  return null;
};

export default RoleBadge;
