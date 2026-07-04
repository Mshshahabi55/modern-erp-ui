import type { GridColDef } from "@mui/x-data-grid";

import { DataTable } from "@/components/common/DataTable";

import type { Customer } from "../types/customer.types";

const columns: GridColDef[] = [
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
];

interface CustomerTableProps {
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
}: CustomerTableProps) {
  return (
    <DataTable<Customer>
      rows={customers}
      columns={columns}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}