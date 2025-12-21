import type { ApiResponse, loginResponse, NicknameRequest } from '@/types/auth';
import { axiosInstance } from './api';

export const postCheckNickname = async (body: NicknameRequest) => {
  const { data } = await axiosInstance.post<ApiResponse>('/api/auth/check-nickname', body);
  return data;
};

export const postSignup = async (body: NicknameRequest) => {
  const { data } = await axiosInstance.post<ApiResponse>('/api/auth/signup', body);
  return data;
};

export const postLogin = async (body: NicknameRequest) => {
  const { data } = await axiosInstance.post<loginResponse>('/api/auth/login', body);
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get<ApiResponse>('/api/auth/me');
  return data;
};
