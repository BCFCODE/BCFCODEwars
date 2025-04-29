import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

interface Props {
  value: number;
}

const Target = ({ value }: Props) => {
  switch (value) {
    case 0:
      return <SignalCellularAlt1BarIcon sx={{ fontSize: 100 }} />;
    case 1:
      return <SignalCellularAlt2BarIcon sx={{ fontSize: 100 }} />;
    case 2:
      return <SignalCellularAltIcon sx={{ fontSize: 100 }} />;
    case 3:
      return <TipsAndUpdatesIcon sx={{ fontSize: 100 }} />;
  }
};

export default Target;
