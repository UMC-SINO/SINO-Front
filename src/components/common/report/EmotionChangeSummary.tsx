type ChangeItem = {
  from: string;
  to: string;
};

type Props = {
  count: number;
  items: ChangeItem[];
};

const EmotionChangeSummary = ({ count, items }: Props) => {
  return (
    <div>
      <p className='text-base mb-8'>
        you change noise to signal{' '}
        <span className='text-[#FF6F4B] font-semibold text-base'>{count}</span> times
      </p>

      <ul className='flex flex-col gap-6'>
        {items.map((item, idx) => (
          <li key={idx} className='flex items-start gap-4'>
            <span className='mt-2 w-2.5 h-2.5 rounded-full bg-[#FF6F4B]' />

            <div>
              <div className='flex items-center gap-3 text-base font-medium'>
                {/* 이모지 */}
                <span className='w-4 h-4 rounded-full bg-white/30 inline-block' />
                <span>{item.from}</span>

                <span className='text-white/60 mx-1'>→</span>

                {/* 이모지 */}
                <span className='w-4 h-4 rounded-full bg-white/30 inline-block' />
                <span>{item.to}</span>
              </div>

              <p className='text-sm text-white/50 mt-1'>because it makes me feel satisfied</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionChangeSummary;
