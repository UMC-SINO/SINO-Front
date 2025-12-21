// api/postApi.ts
import type { ApiResponse, DeletePostSuccess, PostErrorCode, ToggleBookmarkResponse } from '@/types/post';
import { axiosInstance } from './api';

export const deletePost = async (postId: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<DeletePostSuccess, null, PostErrorCode>>(
    `/api/posts/${postId}`,
  );

// PATCH /api/posts/{postId}/bookmark
export const patchToggleBookmark = async (postId: number) => {
  const { data } = await axiosInstance.patch<ToggleBookmarkResponse>(
    `/api/posts/${postId}/bookmark`,
  );

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error(data?.error?.reason ?? 'toggle bookmark failed');
  }

  return data;
};
