import Button from '@/components/common/Button';
import DotIndicator from '@/components/emojiComponents/DotIndicator';
import EmojiSlide from '@/components/emojiComponents/EmojiSlide';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { selectedEmojisAtom } from '@/atoms';

const EmojiPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { year = 2025, month = 12 } = state || {};

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const setSelectedEmojis = useSetAtom(selectedEmojisAtom);

  const canContinue = savedIds.length >= 1 && savedIds.length <= 5;

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (!canContinue) return;

    setSelectedEmojis(savedIds);
    console.log('jotai로 저장할 이모지:', savedIds);
    navigate('/retro');
  };

  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-screen'>
      <div className='text-left text-2xl font-bold leading-tight text-white'>
        How are you <br />
        feeling{' '}
        <span className='text-[#FF8C6F]'>
          {year}/{month}
        </span>{' '}
        day?
      </div>

      <div className='mt-4'>
        <EmojiSlide onSavedChange={setSavedIds} />
      </div>

      <div className='flex gap-7 mt-4'>
        <Button type='button' className='w-50 bg-[#E1E0E0]!' onClick={handleBack}>
          Back
        </Button>
        <Button type='button' className='w-50' onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </div>

      <DotIndicator savedIds={savedIds} total={5} />
    </div>
  );
};

export default EmojiPage;
