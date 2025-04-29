import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { SxProps } from "@mui/material";

const style: SxProps = {
  fontSize: 40,
};

interface Props {
  value: number;
}

const Target = ({ value }: Props) => {
  switch (value) {
    case 1:
      return (
        <LooksOneIcon sx={style} color={value === 1 ? "success" : "disabled"} />
      );
    case 2:
      return (
        <LooksTwoIcon sx={style} color={value === 2 ? "warning" : "disabled"} />
      );
    case 3:
      return (
        <WhatshotIcon sx={style} color={value === 3 ? "error" : "disabled"} />
      );
  }
};

export default Target;
