import InboxIcon from "@mui/icons-material/Inbox";
import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchBox } from "@/components/common/SearchBox";
import { TableToolbar } from "@/components/common/TableToolbar";

import {
  CustomerDialog,
  CustomerTable,
} from "../components";

import { useCustomersPage } from "../hooks/useCustomersPage";

function CustomersPage() {
  const page = useCustomersPage();

  const {
    customersQuery,
    filteredCustomers,

    search,
    setSearch,

    dialogOpen,
    selectedCustomer,

    deleteDialogOpen,
    customerToDelete,

    createCustomer,
    updateCustomer,
    deleteCustomer,

    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,

    handleCloseDialog,
    handleCloseDeleteDialog,

    handleSubmit,
    handleConfirmDelete,
  } = page;

  if (customersQuery.isLoading) {
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

  if (customersQuery.isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {customersQuery.error instanceof Error
            ? customersQuery.error.message
            : "Failed to load customers."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <TableToolbar
        title="Customers"
        addButtonText="Add Customer"
        onAdd={handleAddCustomer}
        search={
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search customers..."
          />
        }
      />

      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon={<InboxIcon fontSize="inherit" />}
          title="No customers found"
          description="Start by creating your first customer."
          actionText="Add Customer"
          onAction={handleAddCustomer}
        />
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          loading={customersQuery.isLoading}
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
        message={`Are you sure you want to delete "${
          customerToDelete?.name ?? ""
        }"?`}
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