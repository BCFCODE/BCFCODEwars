import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";

const MemberSinceCell = () => {
  const { firstLogin } = useCurrentUser();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(firstLogin).toLocaleDateString()}
    </TableCell>
  );
};

export default MemberSinceCell;
