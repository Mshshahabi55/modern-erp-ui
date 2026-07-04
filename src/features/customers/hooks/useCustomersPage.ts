import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import { useDebounce } from "@/hooks/useDebounce";

import { useCustomers } from "./useCustomers";

import {
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "./useCustomerMutations";

import type { Customer } from "../types/customer.types";
import type { CustomerFormValues } from "../validation/customer.schema";
import { normalize } from "../utils";

export function useCustomersPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [customerToDelete, setCustomerToDelete] =
    useState<Customer | null>(null);

  const debouncedSearch = useDebounce(search);

  const customersQuery = useCustomers({
    search: debouncedSearch,
  });

  const createCustomer = useCreateCustomer();

  const updateCustomer = useUpdateCustomer();

  const deleteCustomer = useDeleteCustomer();

  const filteredCustomers = useMemo(() => {
    const customers = customersQuery.data ?? [];

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
  }, [customersQuery.data, debouncedSearch]);

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

        toast.success("Customer updated successfully.");
      } else {
        await createCustomer.mutateAsync(data);

        toast.success("Customer created successfully.");
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

      toast.success("Customer deleted successfully.");

      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed.");
    }
  }

  return {
    // Search
    search,
    setSearch,

    // Data
    customersQuery,
    filteredCustomers,

    // Dialogs
    dialogOpen,
    deleteDialogOpen,

    // Selected Items
    selectedCustomer,
    customerToDelete,

    // Mutations
    createCustomer,
    updateCustomer,
    deleteCustomer,

    // Dialog Actions
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,

    handleCloseDialog,
    handleCloseDeleteDialog,

    // CRUD Actions
    handleSubmit,
    handleConfirmDelete,
  };
}