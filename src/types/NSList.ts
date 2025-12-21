import type { CommonResponse } from './common';

export interface NSItem {
  id: number;
  user_id: number;
  date: string | null;
  title: string;
  content: string;
  is_deleted: boolean;
  deleted_at: string | null;
  photo_url: string | null;
  created_at: string;
  book_mark: boolean;
  signal_noise: 'signal' | 'noise';
}

export type NSListResponse = CommonResponse<{
  result: NSItem[];
}>;
