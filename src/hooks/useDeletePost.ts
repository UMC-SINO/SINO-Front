import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/api/PostApi';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),

    onSuccess: (res) => {
      if (res.resultType === 'FAIL') {
        console.error(`DELETE FAIL ${res.error.errorCode}: ${res.error.reason}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },

    onError: (err) => {
      console.error('DELETE ERROR', err);
    },
  });
}
