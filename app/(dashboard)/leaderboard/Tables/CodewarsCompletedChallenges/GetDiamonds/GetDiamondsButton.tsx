import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import { diamondTextStyle } from "../../../styles";
import { DatabaseUser } from "@/types/database";

const { getSingleChallenge } = new CodewarsService();

interface Props {
  challenge: CodewarsCompletedChallenge;
  userInDB: DatabaseUser;
}

const GetDiamondsButton = ({
  userInDB: {
    codewars: { username },
  },
  challenge: { id },
}: Props) => {
  return (
    <Box sx={diamondTextStyle}>
      {/* TODO: Send a request to codewars api to catch this specific solved problem and write it to our database */}
      <Typography>{Math.floor(Math.random() * 100000)}</Typography>
      <DiamondIcon />
      <IconButton
        color="primary"
        onClick={async () => {
          const fetchedChallenge = await getSingleChallenge(username, id);

          console.log("codewars userInDB >>", username);
          console.log("fetchedChallenge >>", fetchedChallenge);
        }}
      >
        <DiamondIcon />
      </IconButton>
    </Box>
  );
};

export default GetDiamondsButton;
