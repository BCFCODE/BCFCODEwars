import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { TableCell } from "@mui/material";
import { tableCellStyles } from "./styles";
import Badge from "./Badge";
import Name from "./Name";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { UserRole } from "@/types/users";

export default function AvatarCell() {
  const {
    currentUser: { image, name, role, websiteUrl },
  } = useCurrentUserContext();
  console.log(name, role, websiteUrl, role === UserRole.SuperAdmin);
  return (
    <TableCell sx={tableCellStyles} component="th" scope="row">
      {role === UserRole.SuperAdmin && (
        <VerifiedUserIcon
          fontSize="small"
          sx={{
            color: "#FFD700", // classic gold color
            filter: "drop-shadow(0 0 4px #FFC107)", // subtle glowing effect
            // fontSize: 20, // bigger icon for emphasis
          }}
        />
      )}
      <Badge imageUrl={image ?? ""} />
      <Name text={name} />
    </TableCell>
  );
}
