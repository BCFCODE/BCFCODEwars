import { iconButtonStyles } from "@/app/(dashboard)/leaderboard/styles";
import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  isDisabled: boolean;
  handleClick: () => void;
  children: ReactNode;
}

const DiamondIconButton = ({ isDisabled, handleClick, children }: Props) => {
  return (
    <IconButton
      disabled={isDisabled}
      sx={iconButtonStyles}
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
};

export default DiamondIconButton;
