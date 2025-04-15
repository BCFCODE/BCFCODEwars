import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";

const LastLoginCell = () => {
  const { lastLogin } = useCurrentUser();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(lastLogin).toLocaleTimeString()}
    </TableCell>
  );
};

export default LastLoginCell;
