import {
  codewarsCellStyles,
  textStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import { FormControlLabel, TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = {
  inputProps: { "aria-label": "Switch for collecting diamonds from codewars" },
};

export default function SwitchCell() {
  
    return (
      <TableCell sx={textStyles} align="left">
        <FormControlLabel
          control={
            <Switch
              {...label}
            
              // checked={showNewChallenges}
              // onChange={() => setShowNewChallenges((prev) => !prev)}
              color="primary"
            />
          }
          label="Show New"
          sx={{ color: "white" }}
        />
      </TableCell>
    );
}
