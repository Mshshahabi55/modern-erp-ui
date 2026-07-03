import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { SearchBox } from "@/components/common/SearchBox";
import { useDebounce } from "@/hooks/useDebounce";

import { CustomerTable } from "../components/CustomerTable";
import { useCustomers } from "../hooks/useCustomers";

function normalize(value?: string | number): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[-\s]/g, "");
}

function CustomersPage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useCustomers();

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
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Customers
      </Typography>

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
        />
      )}
    </Box>
  );
}

export default CustomersPage;