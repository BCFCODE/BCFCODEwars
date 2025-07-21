import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import Box from "@mui/system/Box";
import { icons } from "./DailyTarget/TargetSelector";

const BottomInfo = () => {
  const { label } = useGaugeContext();

  return (
    <>
      <Box
        sx={{
          color: "text.secondary",
          display: "inline",
          fontSize: "0.875rem",
        }}
      >
        {icons[label - 1].title}
      </Box>
    </>
  );
};

export default BottomInfo;
