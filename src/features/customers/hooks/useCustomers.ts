import { useQuery } from "@tanstack/react-query";

import { customerService } from "../services/customer.service";

interface UseCustomersOptions {
  search?: string;
}

export function useCustomers(options?: UseCustomersOptions) {
  return useQuery({
    queryKey: ["customers", options?.search],

    queryFn: () =>
      customerService.getAll({
        q: options?.search,
      }),
  });
}