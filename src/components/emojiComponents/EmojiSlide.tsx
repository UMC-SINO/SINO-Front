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
import { useState } from 'react';
import type React from 'react';
import EmojiSelectBar from './EmojiSelectBar';

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

  const roleStyle = (role: 'left' | 'center' | 'right') => {
    if (role === 'center') return { scale: 1, opacity: 1 };
    return { scale: 0.5, opacity: 0.5 };
  };

  const leftIdx = visible - 1;
  const rightIdx = visible + 1;

  const handleSelectBarChange = (next: number) => {
    setVisible(next);
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
      <div className='flex justify-center items-center gap-5 p-7'>
        <EmojiSelectBar value={visible} max={emojis.length - 1} onChange={handleSelectBarChange} />
      </div>
    </div>
  );
};

export default EmojiSlide;
