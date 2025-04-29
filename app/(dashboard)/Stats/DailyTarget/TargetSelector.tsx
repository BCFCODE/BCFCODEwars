"use client";
import { SvgIconComponent } from "@mui/icons-material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Or BoltIcon
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import useTargetStore, { TargetLevel } from "./store/useTargetStore";

type IconColor = OverridableStringUnion<
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "secondary"
  | "info"
  | "disabled"
>;

interface Icon {
  title: string;
  Icon: SvgIconComponent;
  color: IconColor;
  value: TargetLevel;
}

const icons: Icon[] = [
  {
    title: "1 problem/day",
    Icon: LooksOneIcon,
    color: "success",
    value: 1,
  },
  {
    title: "2 problems/day",
    Icon: LooksTwoIcon,
    color: "warning",
    value: 2,
  },
  {
    title: "3+ problems/day",
    Icon: WhatshotIcon,
    color: "error",
    value: 3,
  },
];

export default function TargetSelector() {
  const { target, setTarget } = useTargetStore();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: TargetLevel | null
  ) => {
    if (newValue !== null) {
      setTarget(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={target}
      exclusive
      onChange={handleChange}
      color="primary"
      size="large"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {icons.map(({ value, Icon, color, title }) => (
        <Tooltip title={title}>
          <ToggleButton value={value} sx={{ padding: 0.2, border: "none" }}>
            <Icon
              sx={{ fontSize: 40 }}
              color={target === value ? color : "disabled"}
            />
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
