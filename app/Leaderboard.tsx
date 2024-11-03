'use client'
// Column visibility panel: https://mui.com/x/react-data-grid/column-visibility/#column-visibility-panel
// DataGrid API: https://mui.com/x/api/data-grid/data-grid/
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function LeaderBoard() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 10,
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        {...data}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

