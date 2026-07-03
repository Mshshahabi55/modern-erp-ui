import type { BaseEntity } from "@/types/entity.types";

export interface Customer extends BaseEntity {
  code: string;

  name: string;

  company?: string;

  phone?: string;

  mobile?: string;

  email?: string;

  address?: string;

  city?: string;

  postalCode?: string;

  creditLimit?: number;
}