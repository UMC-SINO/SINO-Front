import { emojis } from '@/data/emoji';

type Props = {
  emotions: string[];
};

export const EmotionChips = ({ emotions }: Props) => {
  return (
    <div className='w-full'>
      <div className='text-sm text-white mb-2'>Emotion</div>

      <div className='w-full border border-[#FAFAFA] rounded-full px-5 py-3 flex justify-between items-center'>
        {emotions.map((label) => {
          const emojiItem = emojis.find((e) => e.label === label);
          if (!emojiItem) return null;
          const EmojiComp = emojiItem.Comp;
          return (
            <div key={label} className='w-8 h-8 flex items-center justify-center'>
              <EmojiComp />
            </div>
          );
        })}
      </div>
    </div>
  );
};
