import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

interface UseCustomersOptions {
  search?: string;
}

export function useCustomers(options?: UseCustomersOptions) {
  const params = {
    ...(options?.search ? { q: options.search } : {}),
  };

  return useQuery({
    queryKey: ["customers", { search: options?.search }],
    queryFn: () => customerService.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}