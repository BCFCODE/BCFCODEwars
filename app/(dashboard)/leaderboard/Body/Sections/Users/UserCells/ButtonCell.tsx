import { TableCell } from "@mui/material";
import React from "react";
import OpenButton from "../../Collapse/OpenButton";

interface Props {
  onOpen: {
    isCollapse: boolean;
    handleOpen: () => void;
  };
}

const ButtonCell = ({ onOpen }: Props) => {
  return (
    <TableCell>
      <OpenButton {...onOpen} />
    </TableCell>
  );
};

export default ButtonCell;
