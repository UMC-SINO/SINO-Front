import { axiosInstance } from './api';
import type { ToggleBookmarkResponse, wirteResponse, DeletePostSuccess } from '@/types/post';
import type { ApiResponse } from '@/types/common';
import type { NSDetailResponse } from '@/types/emoji';

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

interface PostWriteParams {
  date: string;
  title: string;
  content: string;
  emotions: string[];
  photo?: File | null;
}

export const postWrite = async (params: PostWriteParams): Promise<wirteResponse> => {
  const formData = new FormData();

  formData.append('date', params.date);
  formData.append('title', params.title);
  formData.append('content', params.content);
  formData.append('emotions', JSON.stringify(params.emotions));

  if (params.photo) {
    formData.append('photo', params.photo);
  }

  const { data } = await axiosInstance.post('/api/posts/create', formData);

  return data;
};

export const getNSDetail = async (postId: number): Promise<NSDetailResponse> => {
  const { data } = await axiosInstance.get(`/api/posts/${postId}`);
  return data;
};
