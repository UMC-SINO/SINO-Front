// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/post';
import { getNoiseCards, getSignalCards } from '@/api/postApi';

interface UsePostsParams {
  type: 'signal' | 'noise';
  userId: number;
  filter: 'year' | 'month' | 'bookmark';
  year?: string;
  month?: string;
}

export const usePosts = ({ type, userId, filter, year, month }: UsePostsParams) => {
  const queryFn = () => {
    if (type === 'signal') return getSignalCards({ userId, filter, year, month });
    return getNoiseCards({ userId, filter, year, month });
  };

  return useQuery<Post[], Error>({
    queryKey: ['posts', type, { filter, year, month }],
    queryFn,
    staleTime: 1000 * 60 * 5,
  });
};
