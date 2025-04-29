import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
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

export default marks