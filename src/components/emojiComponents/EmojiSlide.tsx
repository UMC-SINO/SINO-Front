import { LayoutGroup, motion } from 'framer-motion';
import Happy from '../../assets/emojis/Happy.svg?react';
import Afraid from '../../assets/emojis/Afraid.svg?react';
import Angry from '../../assets/emojis/Angry.svg?react';
import Boredom from '../../assets/emojis/Boredom.svg?react';
import Joyful from '../../assets/emojis/Joyful.svg?react';
import Sad from '../../assets/emojis/Sad.svg?react';
import Shameful from '../../assets/emojis/Shameful.svg?react';
import Smile from '../../assets/emojis/Smile.svg?react';
import Unrest from '../../assets/emojis/Unrest.svg?react';
import Worried from '../../assets/emojis/Worried.svg?react';
import Check from '../../assets/emojis/Check.svg?react';
import { useState } from 'react';
import type React from 'react';
import EmojiSelectBar from './EmojiSelectBar';
import { Check as CheckIcon } from 'lucide-react';

type EmojiProps = {
  id: string;
  label: string;
  Comp: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type EmojiSlideProps = {
  // eslint-disable-next-line no-unused-vars
  onSavedChange?: (savedIds: string[]) => void;
};

export const emojis: EmojiProps[] = [
  { id: 'Happy', label: 'Happy', Comp: Happy },
  { id: 'Afraid', label: 'Afraid', Comp: Afraid },
  { id: 'Angry', label: 'Angry', Comp: Angry },
  { id: 'Boredom', label: 'Boredom', Comp: Boredom },
  { id: 'Joyful', label: 'Joyful', Comp: Joyful },
  { id: 'Sad', label: 'Sad', Comp: Sad },
  { id: 'Shameful', label: 'Shameful', Comp: Shameful },
  { id: 'Smile', label: 'Smile', Comp: Smile },
  { id: 'Unrest', label: 'Unrest', Comp: Unrest },
  { id: 'Worried', label: 'Worried', Comp: Worried },
];

const EmojiSlide = ({ onSavedChange }: EmojiSlideProps) => {
  const [visible, setVisible] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const center = emojis[visible];
  const isCenterSaved = savedIds.includes(center.id);
  const CenterComp = emojis[visible].Comp;

  const roleStyle = (role: 'left' | 'center' | 'right') => {
    if (role === 'center') return { scale: 1, opacity: 1 };
    return { scale: 0.5, opacity: 0.5 };
  };

  const leftIdx = visible - 1;
  const rightIdx = visible + 1;

  const handleSelectBarChange = (next: number) => {
    setVisible(next);
  };

  const handleSaveClicked = () => {
    setSavedIds((prev) => {
      const exists = prev.includes(center.id);

      let next = prev;

      if (exists) next = prev.filter((id) => id !== center.id);
      else if (prev.length < 5) next = [...prev, center.id];
      else next = prev;

      onSavedChange?.(next);
      return next;
    });
  };

  return (
    <div>
      <LayoutGroup>
        <div className='flex w-full h-full items-center justify-center gap-5'>
          <div className='w-full h-full items-center justify-center'>
            {leftIdx >= 0 ? (
              (() => {
                const LeftComp = emojis[leftIdx].Comp;
                return (
                  <motion.div
                    key={`emoji-${leftIdx}`}
                    layout
                    layoutId={`emoji-${leftIdx}`}
                    animate={roleStyle('left')}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <LeftComp className='w-full h-full' />
                  </motion.div>
                );
              })()
            ) : (
              <div className='w-[150px] h-full opacity-0' />
            )}
          </div>
          <div className='w-full h-full items-center justify-center'>
            <motion.div
              key={`emoji-${visible}`}
              layout
              layoutId={`emoji-${visible}`}
              animate={roleStyle('center')}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className='relative inline-flex'>
                <CenterComp className='w-full h-full' />
                {isCenterSaved && (
                  <Check className='absolute -top-10 -right-10 w-30 h-30 pointer-events-none' />
                )}
              </div>
              <p className='flex flex-col mt-6 items-center text-center text-white font-pretendard'>
                {center.label}
              </p>
            </motion.div>
          </div>
          <div className='w-full h-full items-center justify-center'>
            {rightIdx < emojis.length ? (
              (() => {
                const RightComp = emojis[rightIdx].Comp;
                return (
                  <motion.div
                    key={`emoji-${rightIdx}`}
                    layout
                    layoutId={`emoji-${rightIdx}`}
                    animate={roleStyle('right')}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <RightComp className='w-full h-full' />
                  </motion.div>
                );
              })()
            ) : (
              <div className='w-[150px] h-full opacity-0' />
            )}
          </div>
        </div>
      </LayoutGroup>
      <div className='flex justify-center items-center gap-5 pt-15'>
        <EmojiSelectBar value={visible} max={emojis.length - 1} onChange={handleSelectBarChange} />
        <label className='flex items-center gap-3 cursor-pointer select-none'>
          <span className='relative inline-flex h-5 w-5 items-center justify-center'>
            <input
              type='checkbox'
              checked={isCenterSaved}
              onChange={handleSaveClicked}
              className='absolute inset-0 top-1 h-5 w-5 appearance-none rounded border border-white/70 bg-transparent cursor-pointer'
            />

            {isCenterSaved && (
              <CheckIcon
                size={14}
                strokeWidth={3}
                className='relative top-[4px] text-white pointer-events-none'
              />
            )}
          </span>

          <span className='pt-1 text-white text-sm font-pretendard'>save</span>
        </label>
      </div>
    </div>
  );
};

export default EmojiSlide;
