import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import { TableCell } from "@mui/material";
import Badge from "./Badge";
import Name from "./Name";
import { tableCellStyles } from "./styles";

export default function AvatarCell() {
  const { image, name } = useCurrentUser();

  return (
    <TableCell sx={tableCellStyles} component="th" scope="row">
      <Badge imageUrl={image ?? ""} />
      <Name text={name} />
    </TableCell>
  );
}
