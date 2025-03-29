import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell, Typography } from "@mui/material";
import Badge from "./Badge";
import { nameStyles, tableCellStyles } from "./styles";

export default function AvatarCell() {
  const {
    currentUser: { image, name },
  } = useCurrentUserContext();

  return (
    <TableCell sx={tableCellStyles} component="th" scope="row">
      <Badge imageUrl={image} />
      <Typography variant="body2" sx={nameStyles}>
        {name}
      </Typography>
    </TableCell>
  );
}
