export type UserRole = "customer" | "admin";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
  photoURL?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
