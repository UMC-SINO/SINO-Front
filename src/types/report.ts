export type EmotionCounts = Record<string, number>;

export type ModifiedEmotionBundle = {
  postId: number;
  oneLineContents: string[];
  modifiedTrueEmotions: string[];
  modifiedFalseEmotions: string[];
};

export type ReportResponse = {
  postIds: number[];
  emotionCounts: EmotionCounts;
  aiEmotionCounts: EmotionCounts;
  modifiedEmotionBundles: ModifiedEmotionBundle[];
};
