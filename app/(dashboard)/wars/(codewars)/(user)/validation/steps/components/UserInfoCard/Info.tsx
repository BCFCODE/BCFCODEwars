import { SxProps, Typography } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  info: string;
  sx: SxProps;
}

const Info = ({ label, info, sx }: Props) => {
  return (
    <Typography variant="body1" sx={sx}>
      <strong>{label}:</strong> {info}
    </Typography>
  );
};

const InfoCard = () => {
  return
}

export default Info;
