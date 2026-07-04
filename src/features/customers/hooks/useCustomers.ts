import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";

import { customerService } from "../services/customer.service";

interface UseCustomersOptions {
  search?: string;
}

export function useCustomers(options?: UseCustomersOptions) {
  return useQuery({
    queryKey: queryKeys.customers.list(options?.search),

    queryFn: () =>
      customerService.getAll(
        options?.search ? { q: options.search } : undefined,
      ),
  });
}
