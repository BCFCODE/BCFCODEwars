import { Box } from "@mui/system";
import { formatNumberK } from "../utils/formatNumberK";

interface Props {
  totalCodewarsDiamonds: number;
}

const TotalValue = ({ totalCodewarsDiamonds }: Props) => {
  return (
    <Box
      key={totalCodewarsDiamonds}
      sx={{
        color: "text.primary",
        fontSize: "2.125rem",
        fontWeight: "medium",
      }}
    >
      {formatNumberK(totalCodewarsDiamonds)}
    </Box>
  );
};

export default TotalValue;
