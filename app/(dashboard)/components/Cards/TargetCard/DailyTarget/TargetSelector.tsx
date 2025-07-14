"use client";
import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { SvgIconComponent } from "@mui/icons-material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Or BoltIcon
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { TargetLabel } from "./useTargetStore";

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
  value: TargetLabel;
}

const icons: Icon[] = [
  {
    title: "Light Effort: 1/Day",
    Icon: LooksOneIcon,
    color: "success",
    value: 1,
  },
  {
    title: "On Track: 2/Day",
    Icon: LooksTwoIcon,
    color: "warning",
    value: 2,
  },
  {
    title: "Crushing It!: 3+/Day",
    Icon: WhatshotIcon,
    color: "error",
    value: 3,
  },
];

export default function TargetSelector() {
  const { email, label, setTarget } = useGaugeContext();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: TargetLabel | null
  ) => {
    if (newValue !== null) {
      setTarget({ email, label: newValue });
    }
  };

  return (
    <ToggleButtonGroup
      value={label}
      exclusive
      onChange={handleChange}
      color="primary"
      size="large"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {icons.map(({ value, Icon, color, title }, i) => (
        <Tooltip title={title} key={i}>
          <ToggleButton value={value} sx={{ padding: 0.2, border: "none" }}>
            <Icon
              sx={{ fontSize: 55 }}
              color={label === value ? color : "disabled"}
            />
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
