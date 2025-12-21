// hooks/usePostAnalysis.ts
import { getAnalysisEmotions } from '@/api/analyze';
import type { GetAnalysisSuccess } from '@/types/analyze';
import type { ApiResponse } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export const useGetAnalysis = (postId: number) => {
  return useQuery<ApiResponse<GetAnalysisSuccess>>({
    queryKey: ['analyze', 'posts', postId],
    queryFn: () => getAnalysisEmotions(postId),
    staleTime: 1000 * 60 * 5,
  });
};
