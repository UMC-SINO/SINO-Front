import type { ApiSuccessResponse } from './common';

export interface ModifiedEmotionBundle {
  postId: number;
  oneLineContents: string[];
  modifiedTrueEmotions: string[];
  modifiedFalseEmotions: string[];
}

export interface ReportSuccessData {
  postIds: number[];
  emotionCounts: Record<string, number>;
  aiEmotionCounts: Record<string, number>;
  modifiedEmotionBundles: ModifiedEmotionBundle[];
}

export type ReportApiResponse = ApiSuccessResponse<ReportSuccessData>;
