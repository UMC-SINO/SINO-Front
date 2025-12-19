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
        {items.map((item, idx) => (
          <div key={idx} className='flex gap-4'>
            <div className='w-2 h-2 rounded-full bg-[#FF6F4B] mt-3 shrink-0' />

            {/* TODO : 이모지 svg 사용*/}
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-3 text-white text-lg font-medium'>
                <span className='text-2xl'>
                  {item.from === 'Boredom' ? '😐' : item.from === 'Sad' ? '😢' : '🥺'}
                </span>
                <span>{item.from}</span>
                <span className='mx-1'>→</span>
                <span className='text-2xl'>
                  {item.to === 'Happy' ? '🥰' : item.to === 'Smile' ? '😉' : '😐'}
                </span>
                <span>{item.to}</span>
              </div>

              <p className='text-sm text-[#969392]'>because it makes me feel satisfied</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionChangeSummary;
