import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { CustomerTable } from "../components/CustomerTable";
import { useCustomers } from "../hooks/useCustomers";

function CustomersPage() {
  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useCustomers();

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

  if (!customers || customers.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>

        <Alert severity="info">
          No customers found.
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

      <CustomerTable customers={customers} />
    </Box>
  );
}

export default CustomersPage;