// hooks/usePostOneline.ts
import { postOneline } from '@/api/oneline';
import { useMutation } from '@tanstack/react-query';

export const usePostOneline = (onSuccess?: (data: any) => void) => {
  return useMutation({
    mutationFn: ({ postId, oneline }: { postId: number; oneline: string }) =>
      postOneline(postId, { oneline }),
    onSuccess,
  });
};
