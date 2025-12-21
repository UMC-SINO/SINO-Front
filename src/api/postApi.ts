import { axiosInstance } from './api';
import type { ToggleBookmarkResponse } from '@/types/post';

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
