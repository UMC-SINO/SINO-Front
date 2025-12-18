import { LayoutGroup, motion } from 'framer-motion';
import {
  Angry,
  Afraid,
  Boredom,
  Happy,
  Joyful,
  Sad,
  Shameful,
  Smile,
  Unrest,
  Worried,
} from '@/assets';
import { useState } from 'react';
import type React from 'react';

type EmojiProps = {
  key: string;
  label: string;
  Comp: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const emojis: EmojiProps[] = [
  { key: 'Happy', label: 'Happy', Comp: Happy },
  { key: 'Afraid', label: 'Afraid', Comp: Afraid },
  { key: 'Angry', label: 'Angry', Comp: Angry },
  { key: 'Boredom', label: 'Boredom', Comp: Boredom },
  { key: 'Joyful', label: 'Joyful', Comp: Joyful },
  { key: 'Sad', label: 'Sad', Comp: Sad },
  { key: 'Shameful', label: 'Shameful', Comp: Shameful },
  { key: 'Smile', label: 'Smile', Comp: Smile },
  { key: 'Unrest', label: 'Unrest', Comp: Unrest },
  { key: 'Worried', label: 'Worried', Comp: Worried },
];

const EmojiSlide = () => {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);

  // const CenterVariants = {
  //   entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0.5 }),
  //   center: { x: 0, opacity: 1, scale: 1 },
  //   exit: (back: boolean) => ({ x: back ? 500 : -500, opacity: 0, scale: 0.5 }),
  // };

  const roleStyle = (role: 'left' | 'center' | 'right') => {
    if (role === 'center') return { scale: 1, opacity: 1 };
    return { scale: 0.5, opacity: 0.5 };
  };

  const leftIdx = visible - 1;
  const rightIdx = visible + 1;

  const handlePrev = () => {
    setBack(true);
    setVisible((v) => (v > 0 ? v - 1 : v));
  };

  const handleNext = () => {
    setBack(false);
    setVisible((v) => (v < emojis.length - 1 ? v + 1 : v));
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
            {(() => {
              const center = emojis[visible];
              const CenterComp = emojis[visible].Comp;
              return (
                <motion.div
                  key={`emoji-${visible}`}
                  custom={back}
                  layout
                  layoutId={`emoji-${visible}`}
                  animate={roleStyle('center')}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <CenterComp className='w-full h-full' />
                  <p className='flex flex-col mt-6 items-center text-center text-white font-pretendard'>
                    {center.label}
                  </p>
                </motion.div>
              );
            })()}
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
      <div className='flex justify-center gap-5 p-7'>
        <button onClick={handlePrev} className='text-white'>
          prev
        </button>
        <button onClick={handleNext} className='text-white'>
          next
        </button>
      </div>
    </div>
  );
};

export default EmojiSlide;
