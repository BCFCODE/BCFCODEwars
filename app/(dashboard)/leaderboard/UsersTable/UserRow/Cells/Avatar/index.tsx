import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { TableCell } from "@mui/material";
import { tableCellStyles } from "./styles";
import Badge from "./Badge";
import Name from "./Name";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function AvatarCell() {
  const {
    currentUser: { image, name },
  } = useCurrentUserContext();

  return (
    <TableCell sx={tableCellStyles} component="th" scope="row">
      <VerifiedUserIcon
        sx={{
          color: "#FFD700", // classic gold color
          filter: "drop-shadow(0 0 4px #FFC107)", // subtle glowing effect
          fontSize: 20, // bigger icon for emphasis
        }}
      />
      <Badge imageUrl={image ?? ""} />
      <Name text={name} />
    </TableCell>
  );
}
