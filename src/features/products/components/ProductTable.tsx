import type { GridColDef } from "@mui/x-data-grid";

import { DataTable } from "@/components/common/DataTable";

import type { Product } from "../types";

const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "Code",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Product",
    flex: 2,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    flex: 1,
  },
  {
    field: "purchasePrice",
    headerName: "Purchase Price",
    type: "number",
    flex: 1,
    valueFormatter: (value) => `$${Number(value).toFixed(2)}`,
  },
  {
    field: "salePrice",
    headerName: "Sale Price",
    type: "number",
    flex: 1,
    valueFormatter: (value) => `$${Number(value).toFixed(2)}`,
  },
];

interface ProductTableProps {
  products: Product[];

  loading?: boolean;

  onEdit?: (product: Product) => void;

  onDelete?: (product: Product) => void;
}

export function ProductTable({
  products,
  loading,
}: ProductTableProps) {
  return (
    <DataTable<Product>
      rows={products}
      columns={columns}
      loading={loading}
    />
  );
}