import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import type { DataTableProps } from "./types";

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
}: DataTableProps<T>) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
              page: 0,
            },
          },
        }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}