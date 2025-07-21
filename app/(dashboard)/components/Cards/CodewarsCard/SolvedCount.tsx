import Box from "@mui/system/Box";

interface Props {
  position: number;
}

const SolvedCount = ({ position }: Props) => {
  return (
    <Box
      key={position}
      sx={{
        color: "text.primary",
        fontSize: "2.125rem",
        fontWeight: "medium",
      }}
    >
      {position}
    </Box>
  );
};

export default SolvedCount;
