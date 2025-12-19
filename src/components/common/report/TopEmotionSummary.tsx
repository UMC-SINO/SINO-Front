type TopEmotion = {
  count: number;
  // TODO: emoji svg 연결 예정
};

type Props = {
  year: string;
  items: TopEmotion[];
};

type EmotionStyle = {
  circle: string;
  textSize: string;
  color: string;
};

const emotionStyles: EmotionStyle[] = [
  {
    circle: 'w-20 h-20',
    textSize: 'text-xl',
    color: 'text-[#FFB7A5]', // 왼쪽
  },
  {
    circle: 'w-28 h-28',
    textSize: 'text-2xl',
    color: 'text-[#FF6F4B]', // 가운데
  },
  {
    circle: 'w-20 h-20',
    textSize: 'text-xl',
    color: 'text-[#FFD4C9]', // 오른쪽
  },
];

const TopEmotionSummary = ({ year, items }: Props) => {
  return (
    <div>
      <h3 className='text-xl font-semibold mb-10'>Top 3 emotion in {year}</h3>

      <div className='flex gap-12 items-end'>
        {items.map((item, idx) => {
          const style = emotionStyles[idx] ?? emotionStyles[1];

          return (
            <div key={idx} className='flex flex-col items-center'>
              {/* 이모지 placeholder */}
              <div className={`${style.circle} rounded-full bg-white/20 mb-4`} />

              <span className={`font-semibold ${style.textSize} ${style.color}`}>{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopEmotionSummary;
