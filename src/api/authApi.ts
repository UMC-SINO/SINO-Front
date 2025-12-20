// src/apis/authApi.ts
import type { ApiResponse, NicknameRequest } from '@/types/auth';
import { apiClient } from './client';

export const authApi = {
  checkNickname: async (body: NicknameRequest) => {
    const { data } = await apiClient.post<ApiResponse>('/api/auth/check-nickname', body);
    return data;
  },

  signup: async (body: NicknameRequest) => {
    const { data } = await apiClient.post<ApiResponse>('/api/auth/signup', body);
    return data;
  },

  login: async (body: NicknameRequest) => {
    const { data } = await apiClient.post<ApiResponse>('/api/auth/login', body);
    return data;
  },
};
