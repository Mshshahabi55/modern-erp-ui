import type { GridColDef } from "@mui/x-data-grid";

export interface DataTableProps<T> {
  rows: T[];

  columns: GridColDef[];

  loading?: boolean;

  pageSize?: number;
}