import { useMemo, useState } from "react";

import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";

import type { DataTableProps } from "./types";

export function DataTable<
  T extends { id: string | number }
>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  checkboxSelection = false,
  rowSelectionModel,
  onRowSelectionModelChange,
  getRowId,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize,
    });

  const finalColumns = useMemo<GridColDef[]>(() => {
    if (!onEdit && !onDelete) {
      return columns;
    }

    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 110,
        getActions: (params) => {
          const row = params.row as T;

          const actions = [];

          if (onEdit) {
            actions.push(
              <GridActionsCellItem
                key="edit"
                icon={
                  <Tooltip title="Edit">
                    <EditIcon />
                  </Tooltip>
                }
                label="Edit"
                onClick={() => onEdit(row)}
              />
            );
          }

          if (onDelete) {
            actions.push(
              <GridActionsCellItem
                key="delete"
                icon={
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                }
                label="Delete"
                onClick={() => onDelete(row)}
              />
            );
          }

          return actions;
        },
      },
    ];
  }, [columns, onEdit, onDelete]);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={finalColumns}
        loading={loading}
        autoHeight
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={
          onRowSelectionModelChange
        }
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