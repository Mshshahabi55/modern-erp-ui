import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { SearchBox } from "@/components/common/SearchBox";

import { ProductDialog } from "../components/ProductDialog";
import { ProductTable } from "../components/ProductTable";
import { useProductsPage } from "../hooks/useProductsPage";

export default function ProductsPage() {
  const {
    search,
    setSearch,

    dialogOpen,
    selectedProduct,

    filteredProducts,

    productsQuery,

    loading,

    openCreateDialog,
    openEditDialog,
    closeDialog,

    submit,
    remove,
  } = useProductsPage();

  if (productsQuery.isLoading) {
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

  if (productsQuery.isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {productsQuery.error instanceof Error
            ? productsQuery.error.message
            : "Failed to load products."}
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
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={openCreateDialog}
        >
          Add Product
        </Button>
      </Stack>

      <Box mb={3}>
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
        />
      </Box>

      {filteredProducts.length === 0 ? (
        <Alert severity="info">
          No products found.
        </Alert>
      ) : (
        <ProductTable
          products={filteredProducts}
          loading={productsQuery.isLoading}
          onEdit={openEditDialog}
          onDelete={remove}
        />
      )}

      <ProductDialog
        open={dialogOpen}
        product={selectedProduct}
        loading={loading}
        onClose={closeDialog}
        onSubmit={submit}
      />
    </Box>
  );
}