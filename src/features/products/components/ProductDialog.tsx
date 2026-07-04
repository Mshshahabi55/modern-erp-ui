import { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Product } from "../types/product.types";

import {
  productSchema,
  type ProductFormValues,
} from "../validation/product.schema";

interface ProductDialogProps {
  open: boolean;

  loading?: boolean;

  product?: Product | null;

  onClose: () => void;

  onSubmit: (data: ProductFormValues) => void;
}

const defaultValues: ProductFormValues = {
  code: "",
  name: "",
  barcode: "",
  category: "",
  unit: "",
  purchasePrice: 0,
  salePrice: 0,
  stock: 0,
  minStock: 0,
  description: "",
};

export function ProductDialog({
  open,
  loading = false,
  product,
  onClose,
  onSubmit,
}: ProductDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (product) {
      reset({
        code: product.code,
        name: product.name,
        barcode: product.barcode ?? "",
        category: product.category ?? "",
        unit: product.unit ?? "",
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        stock: product.stock,
        minStock: product.minStock ?? 0,
        description: product.description ?? "",
      });

      return;
    }

    reset(defaultValues);
  }, [open, product, reset]);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {product ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Code"
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label="Product Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Barcode"
            {...register("barcode")}
          />

          <TextField
            label="Category"
            {...register("category")}
          />

          <TextField
            label="Unit"
            {...register("unit")}
          />

          <TextField
            label="Purchase Price"
            type="number"
            {...register("purchasePrice")}
            error={!!errors.purchasePrice}
            helperText={errors.purchasePrice?.message}
          />

          <TextField
            label="Sale Price"
            type="number"
            {...register("salePrice")}
            error={!!errors.salePrice}
            helperText={errors.salePrice?.message}
          />

          <TextField
            label="Stock"
            type="number"
            {...register("stock")}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />

          <TextField
            label="Minimum Stock"
            type="number"
            {...register("minStock")}
            error={!!errors.minStock}
            helperText={errors.minStock?.message}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            {...register("description")}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading
            ? product
              ? "Updating..."
              : "Creating..."
            : product
              ? "Update"
              : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}