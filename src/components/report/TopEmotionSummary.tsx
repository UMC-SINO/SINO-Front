// TopEmotionSummary.tsx
import { emojis } from '@/data/emoji';

type TopEmotionItem = {
  emotion: string;
  count: number;
};

type Props = {
  year: string;
  emotionCounts: TopEmotionItem[];
};
const TopEmotionSummary = ({ year, emotionCounts }: Props) => {
  if (!emotionCounts || Object.keys(emotionCounts).length === 0) return null;

  const sortedTopEmotions = Object.entries(emotionCounts)
    .map(([emotion, count]) => ({ emotion, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div>
      <h3 className='text-3xl text-center font-normal mb-4 w-full'>Top emotions in {year}</h3>

      <div className='flex gap-12 items-end justify-center'>
        {sortedTopEmotions.map((item, idx) => {
          const EmojiComp = emojis.find((e) => e.key === item.emotion)?.Comp ?? emojis[0].Comp;

          return (
            <div key={item.emotion} className='flex flex-col items-center'>
              <div
                className={`${idx === 1 ? 'w-28 h-28' : 'w-20 h-20'} flex items-center justify-center`}
              >
                <EmojiComp className='w-3/4 h-3/4' />
              </div>
              <span className='text-xl font-semibold'>{item.count}</span>
              <span className='text-sm text-white/60'>{item.emotion}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopEmotionSummary;
