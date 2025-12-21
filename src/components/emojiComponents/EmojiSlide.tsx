import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import EmojiSelectBar from './EmojiSelectBar';
import Checkbox from './Checkbox';

import { emojis } from '@/data/emoji';
import Check from '../../assets/emojis/Check.svg?react';

type EmojiSlideProps = {
  // eslint-disable-next-line no-unused-vars
  onSavedChange?: (savedIds: string[]) => void;
};

const getOffset = (index: number, activeIndex: number, length: number) => {
  const raw = index - activeIndex;
  const half = Math.floor(length / 2);
  if (raw > half) return raw - length;
  if (raw < -half) return raw + length;
  return raw;
};

const EmojiSlide = ({ onSavedChange }: EmojiSlideProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  const total = emojis.length;

  const isCenterSaved = savedIds.includes(emojis[activeIndex].key);

  useEffect(() => {
    onSavedChange?.(savedIds);
  }, [savedIds, onSavedChange]);

  const handleSaveClicked = () => {
    const key = emojis[activeIndex].key;

    setSavedIds((prev) => {
      if (prev.includes(key)) {
        setSaveError(null);
        return prev.filter((id) => id !== key);
      }

      if (prev.length < 5) {
        setSaveError(null);
        return [...prev, key];
      }

      setSaveError('최대 5개까지 선택할 수 있어요!');
      setShakeKey((k) => k + 1);
      return prev;
    });
  };

  useEffect(() => {
    setSaveError(null);
  }, [activeIndex]);

  return (
    <div>
      <div className='relative flex justify-center items-center h-60 overflow-hidden w-200 cursor-pointer'>
        {emojis.map((emoji, index) => {
          const offset = getOffset(index, activeIndex, total);
          const Comp = emoji.Comp;
          const isCenter = offset === 0;

          const distance = Math.abs(offset);
          const opacity = Math.max(0, 1 - distance * 0.6);

          return (
            <motion.div
              key={emoji.key}
              onClick={() => setActiveIndex(index)}
              animate={{
                x: offset * 160,
                scale: isCenter ? 1 : 0.65,
                opacity,
                zIndex: isCenter ? 10 : 5,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className='absolute'
            >
              <div className='relative flex flex-col items-center'>
                <Comp className='w-40 h-40' />

                {isCenter && savedIds.includes(emoji.key) && (
                  <Check className='absolute -top-8 -right-8 w-24 h-24 pointer-events-none' />
                )}

                {isCenter && <p className='mt-5 text-center text-white'>{emoji.label}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className='flex justify-center items-center gap-5 pt-8'>
        <EmojiSelectBar value={activeIndex} max={total - 1} onChange={setActiveIndex} />

        <Checkbox
          checked={isCenterSaved}
          onChange={handleSaveClicked}
          label='save'
          error={saveError}
          shakeKey={shakeKey}
        />
      </div>
    </div>
  );
};

export default EmojiSlide;
