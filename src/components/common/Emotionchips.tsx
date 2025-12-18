type Props = {
  emotions: string[];
};

export const EmotionChips = ({ emotions }: Props) => {
  return (
    <div className='w-full'>
      <div className='text-xs text-white/50 mb-2'>Emotion</div>

      <div className='w-full bg-[#191919] border border-white/10 rounded-full px-5 py-3 flex justify-between items-center'>
        {emotions.map((emotion) => (
          <div key={emotion} className='w-10 h-10 flex items-center justify-center text-2xl'>
            {emotion}
          </div>
        ))}
      </div>
    </div>
  );
};
