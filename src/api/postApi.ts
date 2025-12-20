import { axiosInstance } from './api';
import type { ToggleBookmarkResponse, DeletePostResponse } from '@/types/post';

// PATCH /api/posts/{postId}/bookmark
export const patchToggleBookmark = async (postId: number) => {
  const { data } = await axiosInstance.patch<ToggleBookmarkResponse>(
    `/api/posts/${postId}/bookmark`,
  );
  return data;
};

// DELETE /api/posts/{postId}
export const deletePost = async (postId: number) => {
  const { data } = await axiosInstance.delete<DeletePostResponse>(`/api/posts/${postId}`);
  return data;
};
