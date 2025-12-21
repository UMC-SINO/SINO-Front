import { axiosInstance } from './api';
import type { ToggleBookmarkResponse, wirteResponse } from '@/types/post';

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

  const { data } = await axiosInstance.post('/api/posts/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
