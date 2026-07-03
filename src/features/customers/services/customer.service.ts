import { BaseApiService } from "@/services/api/BaseApiService";
import type { Customer } from "../types/customer.types";

class CustomerService extends BaseApiService<Customer> {
  constructor() {
    super("/customers");
  }
}

export const customerService = new CustomerService();