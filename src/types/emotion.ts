export type EmotionName =
  | 'Happy'
  | 'Sad'
  | 'Angry'
  | 'Afraid'
  | 'Boredom'
  | 'Joyful'
  | 'Shameful'
  | 'Smile'
  | 'Unrest'
  | 'Worried'
  // 서버가 나중에 새 감정을 추가해도 프론트가 안 깨지게
  | (string & {});
