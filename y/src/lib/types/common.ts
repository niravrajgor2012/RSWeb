export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  pagination?: Pagination;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
