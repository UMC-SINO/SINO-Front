import Button from '@/components/common/Button';
import { NSCardList } from '@/components/common/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/data/nscard';
import { useNavigate } from 'react-router-dom';

const CardListPage = () => {
  const navigate = useNavigate();

  return (
    <div className='text-4xl min-h-dvh flex flex-col items-center justify-center font-semibold gap-10 py-10'>
      <div className='flex flex-row gap-6 items-start'>
        <div className='flex flex-col items-end gap-6'>
          <NSCardList cards={SIGNAL_CARDS} title='Signal' />
          <Button
            type='button'
            className='bg-bgColor text-[#FF6F4B] border border-[#FF6F4B] rounded-full w-48 py-2 text-xl font-semibold mt-7'
            onClick={() => navigate('/retro')}
          >
            Add
          </Button>
        </div>

        <div className='flex flex-col items-start gap-6'>
          <NSCardList cards={NOISE_CARDS} title='Noise' />
          <div className='flex flex-col items-start'>
            <p className='text-gray-500 text-sm opacity-80 mb-2'>
              Create a report of the top 10 signals
            </p>
            <Button
              type='button'
              className='text-bgColor bg-[#FF6F4B] border border-[#FF6F4B] rounded-full w-48 py-2 text-xl font-semibold'
              onClick={() => console.log('리포트 생성 페이지')}
            >
              Create the report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
