import { emojis } from '@/data/emoji';

type EmotionChipsProps = {
  emotions: string[];
};

export const EmotionChips = ({ emotions }: EmotionChipsProps) => {
  if (!emotions.length) return null;

  return (
    <div className='w-full'>
      <div className='text-sm text-white mb-2'>Emotion</div>

      <div className='w-full border border-[#FAFAFA] rounded-full px-5 py-3 flex gap-4 items-center'>
        {emotions.map((key) => {
          const emojiItem = emojis.find((e) => e.key === key);
          if (!emojiItem) return null;
          const EmojiComp = emojiItem.Comp;
          return (
            <div key={key} className='w-8 h-8 flex items-center justify-center'>
              <EmojiComp />
            </div>
          );
        })}
      </div>
    </div>
  );
};
