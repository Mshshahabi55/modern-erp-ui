import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { SearchBox } from "@/components/common/SearchBox";
import { useDebounce } from "@/hooks/useDebounce";

import {
  CustomerDialog,
  CustomerTable,
} from "../components";

import {
  useCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "../hooks";

import type { Customer } from "../types/customer.types";
import type { CustomerFormValues } from "../validation/customer.schema";

function normalize(value?: string | number): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[-\s]/g, "");
}

function CustomersPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [customerToDelete, setCustomerToDelete] =
    useState<Customer | null>(null);

  const debouncedSearch = useDebounce(search);

  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useCustomers({
    search: debouncedSearch,
  });

  const createCustomer = useCreateCustomer();

  const updateCustomer = useUpdateCustomer();

  const deleteCustomer = useDeleteCustomer();

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];

    const keyword = normalize(debouncedSearch);

    if (!keyword) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        normalize(customer.code).includes(keyword) ||
        normalize(customer.name).includes(keyword) ||
        normalize(customer.company).includes(keyword) ||
        normalize(customer.phone).includes(keyword) ||
        normalize(customer.mobile).includes(keyword) ||
        normalize(customer.email).includes(keyword)
      );
    });
  }, [customers, debouncedSearch]);

  function handleAddCustomer() {
    setSelectedCustomer(null);
    setDialogOpen(true);
  }

  function handleEditCustomer(customer: Customer) {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  }

  function handleDeleteCustomer(customer: Customer) {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setSelectedCustomer(null);
  }

  function handleCloseDeleteDialog() {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  }

  async function handleSubmit(
    data: CustomerFormValues
  ) {
    try {
      if (selectedCustomer) {
        await updateCustomer.mutateAsync({
          id: selectedCustomer.id,
          customer: data,
        });

        toast.success(
          "Customer updated successfully."
        );
      } else {
        await createCustomer.mutateAsync(data);

        toast.success(
          "Customer created successfully."
        );
      }

      handleCloseDialog();
    } catch (error) {
      console.error(error);

      toast.error("Operation failed.");
    }
  }

  async function handleConfirmDelete() {
    if (!customerToDelete) return;

    try {
      await deleteCustomer.mutateAsync(
        customerToDelete.id
      );

      toast.success(
        "Customer deleted successfully."
      );

      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed.");
    }
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : "Failed to load customers."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Customers
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </Stack>

      <Box mb={3}>
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search customers..."
        />
      </Box>

      {filteredCustomers.length === 0 ? (
        <Alert severity="info">
          No customers found.
        </Alert>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          loading={isLoading}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      )}

      <CustomerDialog
        open={dialogOpen}
        customer={selectedCustomer}
        loading={
          createCustomer.isPending ||
          updateCustomer.isPending
        }
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name ?? ""}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteCustomer.isPending}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  );
}

export default CustomersPage;