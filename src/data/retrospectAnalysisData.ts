import { emojis } from '@/data/emoji';
import { ANALYSIS_DATA as RAW } from '@/data/analysisData';

export const RETROSPECT_ANALYSIS_DATA = emojis.map((emoji) => {
  const found = RAW.find((d) => d.id === emoji.key);

  return {
    id: emoji.key,
    aiScore: found?.aiScore ?? 0,
    userScore: found?.userScore ?? 0,
  };
});
