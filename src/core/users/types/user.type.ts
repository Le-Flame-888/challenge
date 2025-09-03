export interface ProfileType {
  firstName: string;
  lastName: string;
  age?: number;
}

export interface UserType {
  id: number;
  email: string;
  profile: ProfileType;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateUserType = Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateUserType = Partial<CreateUserType> & { id: number };

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface UserApiResponse extends ApiResponse<UserType> {}

export interface UsersListApiResponse extends ApiResponse<UserType[]> {}
