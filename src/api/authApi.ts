// src/apis/authApi.ts
import type { ApiResponse, NicknameRequest } from '@/types/auth';
import { axiosInstance } from './api';

export const postCheckNickname = {
  checkNickname: async (body: NicknameRequest) => {
    const { data } = await axiosInstance.post<ApiResponse>('/api/auth/check-nickname', body);
    return data;
  },
};

export const postSignup = {
  signup: async (body: NicknameRequest) => {
    const { data } = await axiosInstance.post<ApiResponse>('/api/auth/signup', body);
    return data;
  },
};

export const postLogin = {
  login: async (body: NicknameRequest) => {
    const { data } = await axiosInstance.post<ApiResponse>('/api/auth/login', body);
    return data;
  },
};
