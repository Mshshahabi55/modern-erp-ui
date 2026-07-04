import { useQuery } from "@tanstack/react-query";

import { productService } from "../services";

export function useProducts(
  params?: Record<string, unknown>
) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getAll(params),
  });
}