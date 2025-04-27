"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import LooksOneIcon from "@mui/icons-material/LooksOne";
// import LooksTwoIcon from '@mui/icons-material/LooksTwo';
// import Looks3Icon from '@mui/icons-material/Looks3';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
const marks = [
  {
    value: 0,
    label: <SignalCellularAlt1BarIcon sx={{ fontSize: 20 }} />,
  },
  {
    value: 20,
    label: <SignalCellularAlt2BarIcon sx={{ fontSize: 20 }} />,
  },
  {
    value: 37,
    label: <SignalCellularAltIcon sx={{ fontSize: 20 }} />,
  },
  {
    value: 100,
    label: <LightbulbIcon sx={{ fontSize: 20 }} />,
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DailyTarget() {
  return (
    <Box sx={{ width: 300 , mt: 2}}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="off"
        marks={marks}
      />
    </Box>
  );
}
