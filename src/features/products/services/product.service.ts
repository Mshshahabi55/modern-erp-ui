import { BaseApiService } from "@/services/api/BaseApiService";

import type { Product } from "../types";

class ProductService extends BaseApiService<Product> {
  constructor() {
    super("/products");
  }
}

export const productService = new ProductService();