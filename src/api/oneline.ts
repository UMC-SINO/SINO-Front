import type { OnelineApiResponse } from '@/types/oneLine';
import { axiosInstance } from './api';

export const postOneline = async (postId: number, { oneline }: { oneline: string }) => {
  const response = await axiosInstance.post<OnelineApiResponse>(`/api/posts/${postId}/oneline`, {
    oneline,
  });
  return response.data;
};
