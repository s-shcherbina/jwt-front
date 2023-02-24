import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http';
import AuthService from '../services/AuthService';
import { AuthResponse, IUser, IUserData } from '../types';

export default class Store {
  user = {} as IUserData;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUserData) {
    this.user = user;
  }

  async register(dto: Omit<IUser, 'role'>) {
    try {
      const response = await AuthService.register(dto);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('userId', response.data.userData.id.toString());
      this.setAuth(true);
      this.setUser(response.data.userData);
    } catch (e: any) {
      console.log(e.response.data?.userData);
    }
  }

  async login(phone: string) {
    try {
      const response = await AuthService.login(phone);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userData);
    } catch (e: any) {
      console.log(e.response.data?.message);
    }
  }

  async registerSU(email: string, password: string, invite?: string) {
    try {
      console.log(localStorage.getItem('userId'));
      const userId = Number(localStorage.getItem('userId'));
      const response = await AuthService.registerSU(
        email,
        password,
        userId,
        invite
      );
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userData);
    } catch (e: any) {
      console.log(e.response.data?.message);
    }
  }

  async loginSU(email: string, password: string) {
    try {
      const response = await AuthService.loginSU(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userData);
    } catch (e: any) {
      console.log(e.response.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUserData);
    } catch (e: any) {
      console.log(e.response.data?.message);
    }
  }

  async checkAuth() {
    // this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userData);
    } catch (e: any) {
      console.log(e.response.data?.message);
    }
  }
}
