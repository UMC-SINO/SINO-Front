import { motion } from 'framer-motion';
import { useState } from 'react';
import { emojis } from '@/data/emoji';
import Check from '../../assets/emojis/Check.svg?react';
import { Check as CheckIcon } from 'lucide-react';
import EmojiSelectBar from './EmojiSelectBar';

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
  const total = emojis.length;

  const handleSaveClicked = () => {
    const key = emojis[activeIndex].key;

    setSavedIds((prev) => {
      const exists = prev.includes(key);
      const next = exists
        ? prev.filter((id) => id !== key)
        : prev.length < 5
          ? [...prev, key]
          : prev;

      onSavedChange?.(next);
      return next;
    });
  };

  return (
    <div>
      <div className='relative flex justify-center items-center h-60 overflow-hidden w-200'>
        {emojis.map((emoji, index) => {
          const offset = getOffset(index, activeIndex, total);
          const Comp = emoji.Comp;
          const isCenter = offset === 0;

          const distance = Math.abs(offset);
          const opacity = Math.max(0, 1 - distance * 0.6);

          return (
            <motion.div
              key={emoji.key}
              animate={{
                x: offset * 160,
                scale: isCenter ? 1 : 0.65,
                opacity,
                zIndex: isCenter ? 10 : 5,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 30,
              }}
              className='absolute'
            >
              <div className='relative flex flex-col items-center'>
                <Comp className='w-32 h-32' />

                {isCenter && savedIds.includes(emoji.key) && (
                  <Check className='absolute -top-8 -right-8 w-24 h-24' />
                )}

                {isCenter && <p className='mt-5 text-center text-white'>{emoji.label}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className='flex justify-center items-center gap-5 pt-8'>
        <EmojiSelectBar value={activeIndex} max={total - 1} onChange={setActiveIndex} />

        <label className='flex items-center gap-3 cursor-pointer'>
          <span className='relative inline-flex h-5 w-5'>
            <input
              type='checkbox'
              checked={savedIds.includes(emojis[activeIndex].key)}
              onChange={handleSaveClicked}
              className='absolute inset-0 top-1 h-5 w-5 appearance-none rounded border border-white/70 bg-transparent cursor-pointer'
            />
            {savedIds.includes(emojis[activeIndex].key) && (
              <CheckIcon
                size={14}
                strokeWidth={3}
                className='relative top-2 left-1 text-white pointer-events-none cursor-pointer'
              />
            )}
          </span>
          <span className='text-white text-sm pt-1'>save</span>
        </label>
      </div>
    </div>
  );
};

export default EmojiSlide;
