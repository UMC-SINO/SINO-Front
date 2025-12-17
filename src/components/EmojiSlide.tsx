import { motion } from 'framer-motion';
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

export const emojis = [];

const EmojiSlide = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Happy />
    </motion.div>
  );
};

export default EmojiSlide;
