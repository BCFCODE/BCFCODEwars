import React from "react";
import { TableProps } from "../Table";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props extends TableProps {
  open: boolean;
  onOpen: () => void;
}

const OpenButton = ({ userInDB, open, onOpen }: Props) => {
  return (
    <>
      {/* Expand/Collapse button */}
      {userInDB.codewars?.isConnected && (
        <IconButton
          aria-label="Toggle challenge details"
          size="small"
          onClick={onOpen}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </>
  );
};

export default OpenButton;
