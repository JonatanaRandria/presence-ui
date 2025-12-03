export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  };

export type AuthUser = {
  id : string;
  username : string;
  email : string;
}
  
  
  export type LoginCredentials = {
    email: string;
    password: string;
    remember?: boolean;
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
  };
  
  export type GetUserByIdDTO = {
    userId: string;
  };
  
 export  type TokenVerificationCredentials = {
  token: string;
};