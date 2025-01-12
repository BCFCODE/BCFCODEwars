import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { diamondTextStyle } from "../../styles";
import DiamondIcon from "@mui/icons-material/Diamond";
import { TableProps } from "../../Table";

interface Props extends TableProps {}

const GetDiamondsButton = ({ user }: Props) => {
  return (
    <Box sx={diamondTextStyle}>
      <Button onClick={() => console.log("codewarsUserId", user.codewars.id)}>
        <DiamondIcon />
      </Button>
      {/* Send a request to codewars api to catch this specific solved problem and write it to our database */}
      <Typography>{Math.floor(Math.random() * 100000)}</Typography>
      <DiamondIcon />
    </Box>
  );
};

export default GetDiamondsButton;
