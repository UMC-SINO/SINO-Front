import axios from 'axios';
import type { ApiResponse, DeletePostSuccess, PostErrorCode } from '@/types/post';

export const deletePost = async (postId: number) => {
  const { data } = await axios.delete<ApiResponse<DeletePostSuccess, null, PostErrorCode>>(
    `http://52.91.220.116:3000/api/posts/${postId}`,
    {
      headers: { accept: 'application/json' },
    },
  );

  return data;
};
