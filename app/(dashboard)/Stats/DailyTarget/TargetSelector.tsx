"use client";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Or BoltIcon
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import useTargetStore, { TargetLevel } from "./store/useTargetStore";

export default function TargetSelector() {
  const { target, setTarget } = useTargetStore();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: TargetLevel | null
  ) => {
    if (newValue !== null) setTarget(newValue);
  };

  return (
    <ToggleButtonGroup
      value={target}
      exclusive
      onChange={handleChange}
      color="primary"
      size="large"
      sx={{ display: "flex", justifyContent: "center", fontSize: 100 }}
    >
      <Tooltip title="1 problem/day">
        <ToggleButton value={1} sx={{ padding: 0.2, border: "none" }}>
          <LooksOneIcon color={target === 1 ? "success" : "disabled"} />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="2 problems/day">
        <ToggleButton value={2} sx={{ padding: 0.2, border: "none" }}>
          <LooksTwoIcon color={target === 2 ? "warning" : "disabled"} />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="3+ problems/day">
        <ToggleButton value={3} sx={{ padding: 0.2, border: "none" }}>
          <WhatshotIcon color={target === 3 ? "error" : "disabled"} />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
