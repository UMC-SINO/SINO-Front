import Smile from '@/assets/emojis/Smile.svg?react';
import Happy from '@/assets/emojis/Happy.svg?react';
import Sad from '@/assets/emojis/Sad.svg?react';

type TopEmotion = {
  emotion: 'Smile' | 'Happy' | 'Sad';
  count: number;
};

type Props = {
  year: string;
  items: TopEmotion[];
};

const ICON_MAP = {
  Smile,
  Happy,
  Sad,
};

const TopEmotionSummary = ({ year, items }: Props) => {
  return (
    <div className=''>
      <h3 className='text-3xl text-center font-normal mb-4 w-full'>Top 3 emotion in {year}</h3>

      <div className='flex gap-12 items-end justify-center'>
        {items.map((item, idx) => {
          const Icon = ICON_MAP[item.emotion];

          return (
            <div key={idx} className='flex flex-col items-center'>
              <div
                className={`${
                  idx === 1 ? 'w-28 h-28' : 'w-20 h-20'
                } flex items-center justify-center`}
              >
                <Icon className='w-3/4 h-3/4' />
              </div>
              <span className='text-xl font-semibold'>{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopEmotionSummary;
