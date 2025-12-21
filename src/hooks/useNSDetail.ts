// hooks/useNSDetail.ts
import { useQuery } from '@tanstack/react-query';
import { getNSDetail } from '@/api/postApi';

export const useNSDetail = (postId: number | null) => {
  return useQuery({
    queryKey: ['nsDetail', postId],
    queryFn: () => getNSDetail(postId as number),
    enabled: !!postId,
    select: (res) => res.success,
  });
};
