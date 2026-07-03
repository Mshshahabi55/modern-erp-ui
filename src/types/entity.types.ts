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