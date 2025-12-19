import { emojis } from '@/data/emoji';

interface GraphItemProps {
  id: string;
  aiScore: number;
  userScore: number;
}

export const GraphItem = ({ id, aiScore, userScore }: GraphItemProps) => {
  const emojiData = emojis.find((e) => e.key === id);
  if (!emojiData) return null;

  const { Comp, label } = emojiData;

  return (
    <div className='flex h-6 items-center gap-2 mb-4 text-white'>
      <div className='flex items-center gap-3 w-36 shrink-0'>
        <div className='w-8 h-8'>
          <Comp className='w-full h-full' />
        </div>
        <span className='text-xl font-medium'>{label}</span>
      </div>

      {/**REVIEW : 더 작은 비율을 가진 그래프가 위로 가도록 ? */}
      <div className='relative flex-1 h-7 rounded-r-lg overflow-hidden'>
        <div
          className='absolute top-0 left-0 h-full bg-[#F5A9A9] rounded-r-lg transition-all duration-1000'
          style={{
            width: `${(userScore / 100) * 160}px`,
            zIndex: userScore < aiScore ? 2 : 1,
          }}
        />

        <div
          className='absolute top-0 left-0 h-full bg-[#FF5F5F] rounded-r-lg transition-all duration-1000'
          style={{
            width: `${(aiScore / 100) * 160}px`,
            zIndex: aiScore < userScore ? 2 : 1,
          }}
        />
      </div>
    </div>
  );
};
