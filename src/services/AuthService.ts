import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse, IUser } from '../types';

export default class AuthService {
  static async register(
    dto: Omit<IUser, 'role'>
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', dto);
  }

  static async login(phone: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { phone });
  }

  static async registerSU(
    email: string,
    password: string,
    userId: number,
    invite?: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/register_su', {
      email,
      password,
      userId,
      invite,
    });
  }

  static async loginSU(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('auth/login_su', {
      email,
      password,
    });
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/logout');
  }
}
