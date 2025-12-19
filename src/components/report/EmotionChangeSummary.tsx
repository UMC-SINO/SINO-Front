import Afraid from '@/assets/emojis/Afraid.svg?react';
import Angry from '@/assets/emojis/Angry.svg?react';
import Boredom from '@/assets/emojis/Boredom.svg?react';
import Happy from '@/assets/emojis/Happy.svg?react';
import Joyful from '@/assets/emojis/Joyful.svg?react';
import Sad from '@/assets/emojis/Sad.svg?react';
import Shameful from '@/assets/emojis/Shameful.svg?react';
import Smile from '@/assets/emojis/Smile.svg?react';
import Unrest from '@/assets/emojis/Unrest.svg?react';
import Worried from '@/assets/emojis/Worried.svg?react';
import type React from 'react';

const EMOTION_ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Happy,
  Afraid,
  Angry,
  Boredom,
  Joyful,
  Sad,
  Shameful,
  Smile,
  Unrest,
  Worried,
};

type EmotionChangeItem = {
  from: string;
  to: string;
};

type Props = {
  count: number;
  items: EmotionChangeItem[];
};

const EmotionChangeSummary = ({ count, items }: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      <p className='text-sm text-white'>
        you change noise to signal <span className='text-[#FF6F4B] font-semibold'>{count}</span>{' '}
        times
      </p>

      <div className='flex flex-col gap-6'>
        {items.map((item, idx) => {
          const FromIcon = EMOTION_ICON_MAP[item.from];
          const ToIcon = EMOTION_ICON_MAP[item.to];

          return (
            <div key={idx} className='flex gap-4'>
              <div className='w-2 h-2 rounded-full bg-[#FF6F4B] mt-3 shrink-0' />

              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3 text-white text-lg font-medium'>
                  {FromIcon && <FromIcon className='w-8 h-8 shrink-0' />}
                  <span>{item.from}</span>

                  <span className='mx-1'>→</span>

                  {ToIcon && <ToIcon className='w-8 h-8 shrink-0' />}
                  <span>{item.to}</span>
                </div>

                <p className='text-sm text-[#969392]'>because it makes me feel satisfied</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionChangeSummary;
