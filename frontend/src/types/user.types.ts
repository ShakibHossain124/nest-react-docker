export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    refreshTokens: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  time: string;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedUsersResponse {
  success: boolean;
  data: {
    data: User[];
    meta: PaginatedMeta;
  };
  time: string;
}