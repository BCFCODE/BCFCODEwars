import Box from "@mui/system/Box";

interface Props {
  honor: number;
}

const BottomInfo = ({ honor }: Props) => {
  return (
    <>
      <Box
        sx={{
          color: "text.secondary",
          display: "inline",
          fontSize: "0.875rem",
        }}
      >
        Honor: {honor}
      </Box>
    </>
  );
};

export default BottomInfo;
