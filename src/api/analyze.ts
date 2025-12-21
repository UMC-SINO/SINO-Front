import type { ApiResponse, PostAnalyzeResponse } from '@/types/common';
import { axiosInstance } from './api';
import type { GetAnalysisSuccess } from '@/types/analyze';

export const postAnalyze = async (postId: number): Promise<PostAnalyzeResponse> => {
  const { data } = await axiosInstance.post(`/api/posts/${postId}/analyze`);
  return data;
};

export const getAnalysisEmotions = async (postId: number) => {
  const { data } = await axiosInstance.get<ApiResponse<GetAnalysisSuccess>>(
    `/api/posts/${postId}/analysis`,
  );

  return data;
};
