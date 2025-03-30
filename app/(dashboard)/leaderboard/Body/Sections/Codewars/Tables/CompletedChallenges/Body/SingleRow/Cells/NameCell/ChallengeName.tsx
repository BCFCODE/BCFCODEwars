import { Typography } from "@mui/material";
import { textStyles } from "./styles";

interface Props {
  text: string;
  length: number;
}

const ChallengeName = ({ text, length }: Props) => {
  return (
    <Typography sx={textStyles}>
      {text.length > length ? `${text.slice(0, length)}...` : text}
    </Typography>
  );
};

export default ChallengeName;
