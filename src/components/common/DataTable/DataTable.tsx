import { useState } from "react";

import { Box } from "@mui/material";

import {
  DataGrid,
  type GridPaginationModel,
} from "@mui/x-data-grid";

import type { DataTableProps } from "./types";

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  checkboxSelection = false,
  rowSelectionModel,
  onRowSelectionModelChange,
  getRowId,
}: DataTableProps<T>) {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize,
    });

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        getRowId={getRowId}
        density="standard"
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "divider",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "background.default",
            fontWeight: 700,
          },

          "& .MuiDataGrid-cell": {
            alignItems: "center",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: 1,
            borderColor: "divider",
          },

          "& .MuiDataGrid-overlay": {
            minHeight: 200,
          },
        }}
      />
    </Box>
  );
}