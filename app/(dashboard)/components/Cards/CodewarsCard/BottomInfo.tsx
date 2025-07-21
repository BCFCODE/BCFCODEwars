import Box from "@mui/system/Box";

interface Props {
  leaderboardPosition: number;
}

const BottomInfo = ({ leaderboardPosition }: Props) => {
  return (
    <>
      <Box
        sx={{
          color: "text.secondary",
          display: "inline",
          fontSize: "0.875rem",
        }}
      >
        Position: {leaderboardPosition}
      </Box>
    </>
  );
};

export default BottomInfo;
