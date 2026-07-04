import type { BaseEntity } from "@/types/entity.types";

export interface Product extends BaseEntity {
  code: string;

  name: string;

  barcode?: string;

  category?: string;

  unit?: string;

  purchasePrice: number;

  salePrice: number;

  stock: number;

  minStock?: number;

  description?: string;

  isActive?: boolean;
}