import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell } from "@mui/material";
import { tableCellStyles } from "./styles";
import Badge from "./Badge";
import Name from "./Name";

export default function AvatarCell() {
  const {
    currentUser: { image, name },
  } = useCurrentUserContext();

  return (
    <TableCell sx={tableCellStyles} component="th" scope="row">
      <Badge imageUrl={image} />
      <Name text={name} />
    </TableCell>
  );
}
