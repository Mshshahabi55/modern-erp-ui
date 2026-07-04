import type {
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export interface DataTableProps<T extends { id: string | number }> {
  rows: T[];

  columns: GridColDef[];

  loading?: boolean;

  pageSize?: number;

  checkboxSelection?: boolean;

  rowSelectionModel?: GridRowSelectionModel;

  onRowSelectionModelChange?: (
    model: GridRowSelectionModel
  ) => void;

  getRowId?: (row: T) => GridRowId;

  onEdit?: (row: T) => void;

  onDelete?: (row: T) => void;
}