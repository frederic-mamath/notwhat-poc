export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Context {
  userId?: number;
  user?: User;
}
