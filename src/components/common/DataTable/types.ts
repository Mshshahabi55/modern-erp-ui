import type {
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export interface DataTableProps<T> {
  rows: T[];

  columns: GridColDef[];

  loading?: boolean;

  pageSize?: number;

  checkboxSelection?: boolean;

  rowSelectionModel?: GridRowSelectionModel;

  onRowSelectionModelChange?: (
    model: GridRowSelectionModel
  ) => void;

  getRowId?: (row: T) => string | number;
}