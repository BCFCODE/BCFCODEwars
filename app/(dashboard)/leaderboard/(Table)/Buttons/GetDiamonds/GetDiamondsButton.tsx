import { CodewarsCompletedChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, Button, Typography } from "@mui/material";
import { diamondTextStyle } from "../../styles";
import { TableProps } from "../../Table";

interface Props extends TableProps {
  challenge: CodewarsCompletedChallenge;
}

const GetDiamondsButton = ({ userInDB, challenge }: Props) => {
  return (
    <Box sx={diamondTextStyle}>
      <Button
        onClick={async () => {
          const fetchedChallenge = await fetch(
            `${baseURL}/api/wars/codewars/challenge?username=${userInDB.codewars.username}&challengeId=${challenge.id}`
          ).then((res) => res.json());
          console.log("codewars userInDB >>", userInDB);
          console.log("fetchedChallenge >>", fetchedChallenge);
        }}
      >
        <DiamondIcon />
      </Button>
      {/* TODO: Send a request to codewars api to catch this specific solved problem and write it to our database */}
      <Typography>{Math.floor(Math.random() * 100000)}</Typography>
      <DiamondIcon />
    </Box>
  );
};

export default GetDiamondsButton;
