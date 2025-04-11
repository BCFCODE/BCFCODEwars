import React from "react";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";
import Filter8Icon from "@mui/icons-material/Filter8";

interface Props {
  rank: number;
}

const Icon = ({ rank }: Props) => {
  switch (rank) {
    case 1:
      return <Filter1Icon sx={{ fontSize: "1.2rem" }} />;
    case 2:
      return <Filter2Icon sx={{ fontSize: "1.2rem" }} />;
    case 3:
      return <Filter3Icon sx={{ fontSize: "1.2rem" }} />;
    case 4:
      return <Filter4Icon sx={{ fontSize: "1.2rem" }} />;
    case 5:
      return <Filter5Icon sx={{ fontSize: "1.2rem" }} />;
    case 6:
      return <Filter6Icon sx={{ fontSize: "1.2rem" }} />;
    case 7:
      return <Filter7Icon sx={{ fontSize: "1.2rem" }} />;
    case 8:
      return <Filter8Icon sx={{ fontSize: "1.2rem" }} />;
  }
};

export default Icon;
