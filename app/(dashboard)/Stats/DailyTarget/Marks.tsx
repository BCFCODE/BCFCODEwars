import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";

const marks = [
  {
    value: 0,
    label: <SignalCellularAlt1BarIcon color="error" sx={{ fontSize: 20 }} />,
  },
  {
    value: 50,
    label: <SignalCellularAlt2BarIcon color="warning" sx={{ fontSize: 20 }} />,
  },
  {
    value: 100,
    label: <SignalCellularAltIcon color="info" sx={{ fontSize: 20 }} />,
  },
];

function formatValue(value: number, index: number) {
  switch (value) {
    case 0:
      return String(1);
    case 50:
      return String(2);
    case 100:
      return String(3);
    default:
      return "Out of range!";
  }
}

export { formatValue, marks };
