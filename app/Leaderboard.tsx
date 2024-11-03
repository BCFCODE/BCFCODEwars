"use client";

import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const style = {
  height: "100%",
  width: "100%",
};

export default function LeaderBoard() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });

  return (
    <div {...style}>
      <DataGrid
        {...data}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
