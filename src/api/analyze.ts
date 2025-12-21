import type { ApiResponse } from '@/types/common';
import { axiosInstance } from './api';
import type { AnalyzeSuccessData, GetAnalysisSuccess } from '@/types/analyze';

export const postAnalyze = async (postId: number): Promise<ApiResponse<AnalyzeSuccessData>> => {
  const { data } = await axiosInstance.post<ApiResponse<AnalyzeSuccessData>>(
    `/api/posts/${postId}/analyze`,
  );
  return data;
};

export const getAnalysisEmotions = async (postId: number) => {
  const { data } = await axiosInstance.get<ApiResponse<GetAnalysisSuccess>>(
    `/api/posts/${postId}/analysis`,
  );

  return data;
};
