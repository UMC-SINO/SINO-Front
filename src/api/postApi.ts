import type { DeletePostSuccess, ToggleBookmarkResponse } from '@/types/post';
import { axiosInstance } from './api';
import type { ApiResponse } from '@/types/common';

export const deletePost = async (postId: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<DeletePostSuccess>>(
    `/api/posts/${postId}`,
  );
  return data;
};

export const patchToggleBookmark = async (postId: number) => {
  const { data } = await axiosInstance.patch<ToggleBookmarkResponse>(
    `/api/posts/${postId}/bookmark`,
  );

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error(data?.error?.reason ?? 'toggle bookmark failed');
  }

  return data;
};
