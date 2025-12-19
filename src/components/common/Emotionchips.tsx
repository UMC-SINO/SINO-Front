import type React from 'react';

export type EmotionOption = {
  id: string;
  label?: string;
  icon: React.ReactNode;
};

type Props = {
  emotions: EmotionOption[];
};

export const EmotionChips = ({ emotions }: Props) => {
  return (
    <div className='w-full'>
      <div className='text-sm text-white mb-2'>Emotion</div>

      <div className='w-full border border-[#FAFAFA] rounded-full px-5 py-3 flex justify-between items-center'>
        {emotions.map((emotion) => (
          <div
            key={emotion.id}
            className='w-10 h-10 flex items-center justify-center'
            aria-label={emotion.label ?? emotion.id}
          >
            <div className='w-6 h-6 [&>svg]:w-full [&>svg]:h-full'>{emotion.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
