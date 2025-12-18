import Button from '@/components/common/Button';
import DotIndicator from '@/components/emojiComponents/DotIndicator';
import EmojiSlide from '@/components/emojiComponents/EmojiSlide';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmojiPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { year = 2025, month = 12 } = state || {};

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const canContinue = savedIds.length >= 1 && savedIds.length <= 5;

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    navigate('/next', { state: { savedIds } });
  };

  return (
    <div className='flex flex-col gap-10 items-center justify-center bg-black'>
      <div className='text-left text-white font-pretendard text-[28px] font-bold leading-tight'>
        How are you <br />
        feeling{' '}
        <span className='text-[#FF8C6F]'>
          {year}/{month}
        </span>{' '}
        day?
      </div>

      <div className='flex flex-col items-center justify-center'>
        <EmojiSlide onSavedChange={setSavedIds} />
      </div>
      <div className='flex gap-7 pt-5 items-center justify-center'>
        <Button type='button' className='w-50 bg-[#E1E0E0]' onClick={handleBack}>
          Back
        </Button>
        <Button type='button' className='w-50' onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </div>
      <DotIndicator savedIds={savedIds} total={5} />
      <footer className='pt-20 pb-15 flex justify-center'></footer>
    </div>
  );
};

export default EmojiPage;
