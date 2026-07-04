import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useDebounce } from "@/hooks/useDebounce";

import { useProducts } from "./useProducts";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "./useProductMutations";

import type { Product } from "../types/product.types";
import type { ProductFormValues } from "../validation/product.schema";

function normalize(value?: string | number) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[-\s]/g, "");
}

export function useProductsPage() {
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const debouncedSearch = useDebounce(search);

  const productsQuery = useProducts();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    if (!productsQuery.data) return [];

    const keyword = normalize(debouncedSearch);

    if (!keyword) return productsQuery.data;

    return productsQuery.data.filter((product: Product) => {
      return (
        normalize(product.code).includes(keyword) ||
        normalize(product.name).includes(keyword) ||
        normalize(product.barcode).includes(keyword) ||
        normalize(product.category).includes(keyword)
      );
    });
  }, [productsQuery.data, debouncedSearch]);

  function openCreateDialog() {
    setSelectedProduct(null);
    setDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setSelectedProduct(product);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setSelectedProduct(null);
  }

  async function submit(data: ProductFormValues) {
    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({
          id: selectedProduct.id,
          product: data,
        });

        toast.success("Product updated successfully");
      } else {
        await createProduct.mutateAsync(data);

        toast.success("Product created successfully");
      }

      closeDialog();
    } catch {
      toast.error("Operation failed");
    }
  }

  async function remove(product: Product) {
    if (!window.confirm(`Delete "${product.name}" ?`)) return;

    try {
      await deleteProduct.mutateAsync(product.id);

      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  return {
    search,
    setSearch,

    dialogOpen,
    selectedProduct,

    filteredProducts,

    productsQuery,

    loading:
      createProduct.isPending ||
      updateProduct.isPending ||
      deleteProduct.isPending,

    openCreateDialog,
    openEditDialog,
    closeDialog,

    submit,
    remove,
  };
}