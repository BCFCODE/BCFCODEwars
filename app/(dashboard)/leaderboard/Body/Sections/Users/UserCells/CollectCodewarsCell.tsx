import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import { TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = {
  inputProps: { "aria-label": "Switch for collecting diamonds from codewars" },
};

export default function CollectCodewarsCell() {
  const { isCollectSwitchVisible } = useDBAllUsersContext();

  if (isCollectSwitchVisible)
    return (
      <TableCell sx={{ ...codewarsCellStyles }} align="right">
        <Switch {...label} />
      </TableCell>
    );
}
