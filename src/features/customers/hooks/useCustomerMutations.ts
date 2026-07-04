import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";

import { customerService } from "../services/customer.service";

import type { Customer } from "../types/customer.types";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: Partial<Customer>) =>
      customerService.create(customer),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      customer,
    }: {
      id: number | string;
      customer: Partial<Customer>;
    }) => customerService.update(id, customer),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => customerService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
  });
}
