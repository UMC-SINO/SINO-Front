import type { EmotionName } from '@/types/emotion';
import type { PostEmotionRow } from '@/types/postEmotion';

/** modified=true 인 감정만 추출 */
export const getModifiedEmotionNames = (rows: PostEmotionRow[]): EmotionName[] =>
  rows.filter((r) => r.modified).map((r) => r.emotion_name);

/** 전체 감정(중복 제거) */
export const getAllEmotionNamesUnique = (rows: PostEmotionRow[]): EmotionName[] =>
  Array.from(new Set(rows.map((r) => r.emotion_name)));
