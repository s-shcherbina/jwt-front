export interface IUserData {
  id: number;
  role: string;
}
export interface AuthResponse {
  userData: IUserData;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  name: string;
  phone: string;
  locality: string;
  service: string;
  department: string;
  role: string;
}
