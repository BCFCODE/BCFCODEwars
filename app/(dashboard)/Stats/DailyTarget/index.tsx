"use client";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Or BoltIcon
import { useState } from "react";

export default function TargetSelector() {
  const [target, setTarget] = useState<number>(3);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: number | null
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
      sx={{ display: "flex", justifyContent: "center", height: "auto" }}
    >
      <Tooltip title="1 problem/day">
        <ToggleButton value={1}>
          <LooksOneIcon color={target === 1 ? "success" : "inherit"} />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="2 problems/day">
        <ToggleButton value={2}>
          <LooksTwoIcon color={target === 2 ? "info" : "inherit"} />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="3+ problems/day">
        <ToggleButton value={3}>
          <WhatshotIcon color={target === 3 ? "warning" : "inherit"} />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
