import { axiosInstance } from '@/api/api';
import type { PatchPostEmotionBody, PatchPostEmotionResponse } from '@/types/postEmotion';

export const patchPostEmotion = async (postId: number, body: PatchPostEmotionBody) => {
  const { data } = await axiosInstance.patch<PatchPostEmotionResponse>(
    `/api/posts/${postId}/emotion`,
    body,
  );

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw new Error('patch post emotion failed');
  }

  return data.success; // PostEmotionRow[]
};
