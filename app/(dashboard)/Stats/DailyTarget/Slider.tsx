import { Box, Slider } from "@mui/material";
import React from "react";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const marks = [
  {
    value: 0,
    label: <SignalCellularAlt1BarIcon color="error" sx={{ fontSize: 20 }} />,
  },
  {
    value: 20,
    label: <SignalCellularAlt2BarIcon color="warning" sx={{ fontSize: 20 }} />,
  },
  {
    value: 37,
    label: <SignalCellularAltIcon color="info" sx={{ fontSize: 20 }} />,
  },
  {
    value: 100,
    label: <TipsAndUpdatesIcon color="success" sx={{ fontSize: 20 }} />,
  },
];

function formatValue(value: number, index: number) {
  switch (value) {
    case 0:
      return String(0);
    case 20:
      return String(1);
    case 37:
      return String(2);
    case 100:
      return String(3);
    default:
      return "Out of range!";
  }
}

const TargetPickerSlider = () => {
  const [value, setValue] = React.useState<number>(20);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300, mt: 5 }}>
      <Slider
        value={value}
        aria-label="Custom marks"
        // defaultValue={value}
        valueLabelFormat={formatValue}
        getAriaValueText={formatValue}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TargetPickerSlider;
