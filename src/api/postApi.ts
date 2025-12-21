// api/postApi.ts
import type { ApiResponse, DeletePostSuccess, PostErrorCode } from '@/types/post';
import { axiosInstance } from './api';

export const deletePost = async (postId: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<DeletePostSuccess, null, PostErrorCode>>(
    `/api/posts/${postId}`,
  );

  return data;
};
