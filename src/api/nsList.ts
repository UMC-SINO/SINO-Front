import type { NSListResponse } from '@/types/NSList';
import { axiosInstance } from './api';

export type PostsListRequest =
  | {
      type: 'signal' | 'noise';
      sort: 'year';
      year: string;
      month?: never;
    }
  | {
      type: 'signal' | 'noise';
      sort: 'month';
      year: string;
      month: string;
    }
  | {
      type: 'signal' | 'noise';
      sort: 'bookmark';
      year?: never;
      month?: never;
    };

export const getNSList = async (params: PostsListRequest): Promise<NSListResponse> => {
  const { data } = await axiosInstance.get('/api/posts', {
    params,
  });
  return data;
};
