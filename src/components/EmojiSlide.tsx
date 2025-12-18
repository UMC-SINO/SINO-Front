import { AnimatePresence, motion } from 'framer-motion';
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

  const leftIdx = visible - 1;
  const rightIdx = visible + 1;

  const Left = leftIdx >= 0 ? emojis[leftIdx] : null;
  const Center = emojis[visible];
  const Right = rightIdx < emojis.length ? emojis[rightIdx] : null;

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
      <div>
        {Left && (
          <motion.div>
            <Left />
          </motion.div>
        )}
      </div>
      <div>
        <AnimatePresence custom={back}>
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
        </AnimatePresence>
      </div>
      <div>
        {Right && (
          <motion.div>
            <Right />
          </motion.div>
        )}
      </div>
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
