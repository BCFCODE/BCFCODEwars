import { Box, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import OpenButton from "./OpenButton";
import LeaderboardAvatar from "../../Head/Avatar";
import DiamondIcon from "@mui/icons-material/Diamond";
import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import { codewarsCellStyles, diamondBoxStyles } from "../../styles";

interface Props {
  onOpen: {
    isCollapse: boolean;
    handleOpen: () => void;
  };
}

const TopRow = ({ onOpen }: Props) => {
  const {
    currentUser: { codewars, name, createdAt, lastLogin },
  } = useDBUserContext();

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <OpenButton {...onOpen} />
        </TableCell>
        <TableCell
          sx={{
            ...codewarsCellStyles,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          component="th"
          scope="row"
        >
          <LeaderboardAvatar />
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          {new Date(createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          {new Date(lastLogin).toLocaleTimeString()}
        </TableCell>
        <TableCell sx={{ ...codewarsCellStyles }} align="right">
          <Box sx={diamondBoxStyles}>
            <Typography>{Math.floor(Math.random() * 100000)}</Typography>
            <DiamondIcon />
          </Box>
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          {/* Not available */}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TopRow;
