import Button from '@/components/common/Button';
import { NSCardList } from '@/components/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/data/nscard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='text-4xl min-h-dvh flex flex-col items-center justify-center font-semibold gap-10 py-10'>
      <div className='flex flex-row gap-8 items-start'>
        <div className='flex flex-col items-end gap-8 mb-4'>
          <NSCardList cards={SIGNAL_CARDS} title='Signal' />
          <Button
            type='button'
            className='bg-bgColor text-[#FF6F4B] border border-[#FF6F4B] rounded-full w-[228px] py-2 mt-7'
            onClick={() => navigate('/retro')}
          >
            Add
          </Button>
        </div>

        <div className='flex flex-col items-start gap-8'>
          <NSCardList cards={NOISE_CARDS} title='Noise' />
          <div className='flex flex-col items-start'>
            <p className='text-gray-500 text-sm font-li opacity-80 mb-2'>
              Create a report of the top 10 signals
            </p>
            <Button
              type='button'
              className='text-bgColor bg-[#FF6F4B] border border-[#FF6F4B] rounded-full w-[228px] py-2'
              onClick={() => navigate('/splash')}
            >
              Create the report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
