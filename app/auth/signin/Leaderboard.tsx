"use client";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
 
const CustomToolbar = () => {
  const styles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };
 
  return (
    <Box {...styles}>
      <GridToolbar />
    </Box>
  );
};

export default function LeaderBoard() {
  const { data } = useDemoData({
    dataSet: "Employee",
    rowLength: 10,
    maxColumns: 10,
  });

  const styles = {
    height: "100%",
    width: "100%",
  };

  return (
    <Box {...styles}>
      <DataGrid
        {...data}
        slots={{
          toolbar: CustomToolbar, // Use the custom toolbar
        }}
      />
    </Box>
  );
}
