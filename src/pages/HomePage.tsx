import Button from '@/components/common/Button';
import { NSCardList } from '@/components/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/data/nscard';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import type { NSCardType } from '@/types/NSCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  const [signalCards, setSignalCards] = useState<NSCardType[]>(SIGNAL_CARDS);
  const [noiseCards, setNoiseCards] = useState<NSCardType[]>(NOISE_CARDS);

  const handleCardUpdate = (updated: NSCardType) =>
    setSignalCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

  const handleUpdateNoise = (updated: NSCardType) =>
    setNoiseCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

  return (
    <div className='text-4xl min-h-dvh flex flex-col items-center justify-center font-semibold gap-10 py-10'>
      <div className='flex flex-row gap-8 items-start'>
        <div className='flex flex-col items-end gap-8 mb-4'>
          <NSCardList cards={signalCards} title='Signal' onCardUpdate={handleCardUpdate} />
          <Button
            type='button'
            className='bg-bgColor text-[#FF6F4B] border border-[#FF6F4B] rounded-full w-[228px] py-2 mt-7'
            onClick={() => navigate('/date-select')}
          >
            Add
          </Button>
        </div>

        <div className='flex flex-col items-start gap-8'>
          <NSCardList cards={noiseCards} title='Noise' onCardUpdate={handleUpdateNoise} />
          <div className='flex flex-col items-start'>
            <p className='text-gray-500 text-sm opacity-80 mb-2'>
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
