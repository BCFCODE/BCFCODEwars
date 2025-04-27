import { Typography } from "@mui/material";
import { nameStyles } from "./styles";

interface Props {
  text: string;
}

const Name = ({ text }: Props) => {
  return (
    <Typography variant="body2" sx={nameStyles}>
      {text}
    </Typography>
  );
};

export default Name;
