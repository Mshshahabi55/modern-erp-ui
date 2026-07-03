import type { GridColDef } from "@mui/x-data-grid";
import {
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataTable } from "@/components/common/DataTable";

import type { Customer } from "../types/customer.types";

interface Props {
  customers: Customer[];

  loading?: boolean;

  onEdit?: (customer: Customer) => void;

  onDelete?: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const columns: GridColDef<Customer>[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Customer",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 120,
      align: "center",
      headerAlign: "center",

      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit?.(row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <DataTable<Customer>
      rows={customers}
      columns={columns}
      loading={loading}
    />
  );
}