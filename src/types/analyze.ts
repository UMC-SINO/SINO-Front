import type { ApiSuccessResponse } from './common';

export interface EmotionAnalysis {
  emotion_name: string;
  percentage: number;
}

export interface AnalyzeSuccessData {
  signalNoiseResult: 'Signal' | 'Noise';
  emotions: EmotionAnalysis[];
  analyzedAt: string;
}

export type AnalyzeApiResponse = ApiSuccessResponse<AnalyzeSuccessData>;
