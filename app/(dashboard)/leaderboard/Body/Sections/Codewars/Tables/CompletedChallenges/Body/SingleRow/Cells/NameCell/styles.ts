import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { SxProps } from "@mui/material";

export const nameCellStyles: SxProps = {
  ...codewarsCellStyles,
  // whiteSpace: "nowrap",
  // overflow: "hidden",
  // maxWidth: "50%", // Ensures the cell does not expand beyond the table's natural width
};

export const contentBoxStyles: SxProps = {
  // backgroundColor: "black",
  width: 550,
  // whiteSpace: "wrap",
  display: "flex",
  alignItems: "center",
  justifyContent: 'space-between',
  // gap: 1, // Creates spacing between text and chip
  // width: "80%",
  // overflow: "hidden",
  fontSize: 'inherit'
};

export const textStyles: SxProps = {
  fontSize: 'inherit',
  // overflow: "hidden",
  // textOverflow: "ellipsis",
  // whiteSpace: "nowrap",
  // flexGrow: 1, // Ensures text takes available space without forcing expansion
  // minWidth: 0, // Prevents flex issues with overflow text
};

export const chipStyles: SxProps = {
  // width: 200,
  // fontSize: 13,
  // flexShrink: 0, // Prevents the chip from expanding the cell
};

export const chipIconStyles: SxProps = {
  // height: 15,
  
}
