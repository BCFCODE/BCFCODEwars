import { Box, Slider } from "@mui/material";
import React from "react";
import marks from "./Marks";

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
        aria-label="Select your daily target problem solving"
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
