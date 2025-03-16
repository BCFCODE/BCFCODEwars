import {
  codewarsCellStyles,
  textStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import { FormControlLabel, TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";
import useSwitch from "./useSwitch";

const label = {
  inputProps: { "aria-label": "Switch for collecting diamonds from codewars" },
};

export default function SwitchCell() {
  const { handleClick } = useSwitch();

  return (
    <TableCell sx={textStyles} align="left">
      <FormControlLabel
        control={
          <Switch
            {...label}
            // checked={showNewChallenges}
            onChange={() => handleClick()}
            color="primary"
          />
        }
        label="Show New"
        sx={{ color: "white" }}
      />
    </TableCell>
  );
}
