import type { ApiSuccessResponse } from './common';

export type OnelineSuccess = {
  id: number;
  post_id: number;
  content: string;
};

export type OnelineApiResponse = ApiSuccessResponse<OnelineSuccess>;
