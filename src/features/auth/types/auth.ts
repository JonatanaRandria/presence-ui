export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  };
  
  
  export type LoginCredentials = {
    username: string;
    password: string;
    remember?: boolean;
  };
  
  export type LoginTokenCredentials = {
    token: string;
  };
  
  export type UserResponse = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
    password?: string;
  };
  
  export type AuthState = {
    user: User | null;
    token: string | null;
    remember: boolean | null;
  };
  
  export type GetUserByIdDTO = {
    userId: string;
  };
  