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
    <div className='flex h-6 items-center gap-2 mb-5 text-white'>
      <div className='flex items-center gap-3 w-36 shrink-0'>
        <div className='w-8 h-8'>
          <Comp className='w-full h-full' />
        </div>
        <span className='text-xl font-medium'>{label}</span>
      </div>

      <div className='relative flex-1 h-full overflow-hidden'>
        <div
          className='absolute top-0 left-0 h-full bg-[#F5A9A9] transition-all duration-1000'
          style={{
            width: `${userScore}%`,
            zIndex: userScore < aiScore ? 2 : 1,
            borderTopRightRadius: userScore < aiScore ? '0' : '0.34em',
            borderBottomRightRadius: userScore < aiScore ? '0' : '0.4rem',
          }}
        />

        <div
          className='absolute top-0 left-0 h-full bg-[#FF5F5F] transition-all duration-1000'
          style={{
            width: `${aiScore}%`,
            zIndex: aiScore < userScore ? 2 : 1,
            borderTopRightRadius: aiScore < userScore ? '0' : '0.4rem',
            borderBottomRightRadius: aiScore < userScore ? '0' : '0.4rem',
          }}
        />
      </div>
    </div>
  );
};
