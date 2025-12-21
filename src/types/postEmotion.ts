import type { ApiResponse } from './common';
import type { EmotionName } from './emotion';

export type PostEmotionRow = {
  id: number;
  post_id: number;
  emotion_name: EmotionName;
  modified: boolean;
};

export type PatchPostEmotionBody = {
  emotion: EmotionName[];
};

export type PatchPostEmotionResponse = ApiResponse<PostEmotionRow[]>;
