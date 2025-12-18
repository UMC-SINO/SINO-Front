import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Happy from '../assets/emojis/center/Happy.svg?react';
import Afraid from '../assets/emojis/center/Afraid.svg?react';
import Angry from '../assets/emojis/center/Angry.svg?react';
import Boredom from '../assets/emojis/center/Boredom.svg?react';
import Joyful from '../assets/emojis/center/Joyful.svg?react';
import Sad from '../assets/emojis/center/Sad.svg?react';
import Shameful from '../assets/emojis/center/Shameful.svg?react';
import Smile from '../assets/emojis/center/Smile.svg?react';
import Unrest from '../assets/emojis/center/Unrest.svg?react';
import Worried from '../assets/emojis/center/Worried.svg?react';
import { useState } from 'react';

export const emojis = [
  Happy,
  Afraid,
  Angry,
  Boredom,
  Joyful,
  Sad,
  Shameful,
  Smile,
  Unrest,
  Worried,
];

const EmojiSlide = () => {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);

  const CneterVariants = {
    entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0.5 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (back: boolean) => ({ x: back ? 500 : -500, opacity: 0, scale: 0.5 }),
  };

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
                const Comp = emojis[leftIdx];
                return (
                  <motion.div
                    key={`emoji-${leftIdx}`}
                    layout
                    layoutId={`emoji-${leftIdx}`}
                    animate={roleStyle('left')}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Comp className='w-full h-full' />
                  </motion.div>
                );
              })()
            ) : (
              <div className='w-[150px] h-full opacity-0' />
            )}
          </div>
          <div className='w-full h-full items-center justify-center'>
            {/* <AnimatePresence custom={back}>
            <motion.div
              key={visible}
              variants={CneterVariants}
              custom={back}
              initial='entry'
              animate='center'
              exit='exit'
            >
              <Center />
            </motion.div>
          </AnimatePresence> */}
            {(() => {
              const Comp = emojis[visible];
              return (
                <motion.div
                  key={`emoji-${visible}`}
                  layout
                  layoutId={`emoji-${visible}`}
                  animate={roleStyle('center')}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <Comp className='w-full h-full' />
                </motion.div>
              );
            })()}
          </div>
          <div className='w-full h-full items-center justify-center'>
            {rightIdx < emojis.length ? (
              (() => {
                const Comp = emojis[rightIdx];
                return (
                  <motion.div
                    key={`emoji-${rightIdx}`}
                    layout
                    layoutId={`emoji-${rightIdx}`}
                    animate={roleStyle('right')}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Comp className='w-full h-full' />
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
