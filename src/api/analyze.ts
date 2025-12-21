import type { ApiResponse } from '@/types/common';
import { axiosInstance } from './api';
import type { AnalyzeSuccessData } from '@/types/analyze';

export const postAnalyze = async (postId: number): Promise<ApiResponse<AnalyzeSuccessData>> => {
  const { data } = await axiosInstance.post<ApiResponse<AnalyzeSuccessData>>(
    `/api/posts/${postId}/analyze`,
  );
  return data;
};
