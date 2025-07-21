import Box from "@mui/system/Box";

interface Props {
  totalCompleted: number;
}

const SolvedCount = ({ totalCompleted }: Props) => {
  return (
    <Box
      key={totalCompleted}
      sx={{
        color: "text.primary",
        fontSize: "2.125rem",
        fontWeight: "medium",
      }}
    >
      {totalCompleted}
    </Box>
  );
};

export default SolvedCount;
