import {
  codewarsCellStyles,
  textStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { FormControlLabel, TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = {
  inputProps: { "aria-label": "Switch for collecting diamonds from codewars" },
};

export default function SwitchCell() {
  return (
    <TableCell sx={textStyles} align="left">
    Completed At
    </TableCell>
  );
}
