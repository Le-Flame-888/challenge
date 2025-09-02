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
}

export type CreateUserType = Omit<UserType, 'id'>;
