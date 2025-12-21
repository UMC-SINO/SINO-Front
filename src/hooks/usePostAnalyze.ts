import { useMutation } from '@tanstack/react-query';
import { postAnalyze } from '@/api/analyze';

export const usePostAnalyze = (onSuccess?: (data: any) => void) => {
  const mutation = useMutation({
    mutationFn: (postId: number) => postAnalyze(postId),
    onSuccess, // 외부에서 전달받은 onSuccess 실행
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
};
