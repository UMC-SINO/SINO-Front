import { axiosInstance } from './api';
import type { ReportApiResponse } from '@/types/report';

export const postMonthlyReport = async (year: number, month: number, userId: number) => {
  const response = await axiosInstance.post<ReportApiResponse>(`/api/report/${year}/${month}`, {
    userId,
  });
  return response.data;
};
