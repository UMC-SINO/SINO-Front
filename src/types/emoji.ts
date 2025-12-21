import type React from 'react';
import type { CommonResponse } from './common';

export type Emoji = {
  key: string;
  label: string;
  Comp: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface NSEmotion {
  emotion_name: string;
  modified?: boolean;
  percentage?: number;
}

export interface NSAIAnalysis {
  id: number;
  post_id: number;
  signal_noise_result: 'Signal' | 'Noise';
  aiAnalyzedEmotion: {
    emotion_name: string;
    percentage: number;
  }[];
}

export interface NSDetail {
  id: number;
  user_id: number;
  date: string;
  title: string;
  content: string;
  photo_url: string | null;
  created_at: string;
  book_mark: boolean;
  signal_noise: 'signal' | 'noise';
  is_deleted: boolean;
  aiAnalysis: NSAIAnalysis | null;
  emotion: {
    emotion_name: string;
    modified: boolean;
  }[];
}

export type NSDetailResponse = CommonResponse<NSDetail>;
