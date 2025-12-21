import type { NSListResponse } from '@/types/NSList';
import { axiosInstance } from './api';

type BaseRequest = {
  userId: number;
};

export type SignalListRequest =
  | (BaseRequest & {
      filter: 'year';
      year: string;
      month: '';
    })
  | (BaseRequest & {
      filter: 'month';
      year: string;
      month: string;
    })
  | (BaseRequest & {
      filter: 'bookmark';
      year?: null;
      month?: null;
    });

export const getSignalList = async (params: SignalListRequest): Promise<NSListResponse> => {
  const { data } = await axiosInstance.get('/api/posts/signal', {
    params,
  });
  return data;
};

export const getNoiseList = async (params: SignalListRequest): Promise<NSListResponse> => {
  const { data } = await axiosInstance.get('/api/posts/noise', {
    params,
  });
  return data;
};
