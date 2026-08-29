export interface User {
  id: number;
  name: string;
  email: string;
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
