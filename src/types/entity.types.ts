export interface BaseEntity {
  id: number | string;

  createdAt?: string;

  updatedAt?: string;

  createdBy?: string;

  updatedBy?: string;

  isActive?: boolean;
}

export interface Pagination {
  page: number;

  pageSize: number;

  totalItems: number;

  totalPages: number;
}

export interface PagedResponse<T> {
  items: T[];

  pagination: Pagination;
}

/**
 * DTO used when creating a new entity.
 * Removes server-generated fields.
 */
export type CreateEntity<T extends BaseEntity> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * DTO used when updating an entity.
 * Every field is optional because partial updates are allowed.
 */
export type UpdateEntity<T extends BaseEntity> = Partial<
  CreateEntity<T>
>;