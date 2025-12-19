import { LayoutGroup, motion } from 'framer-motion';
import Check from '../../assets/emojis/Check.svg?react';
import { useState } from 'react';
import EmojiSelectBar from './EmojiSelectBar';
import { emojis } from '@/data/emoji';
import Checkbox from './Checkbox';

type EmojiSlideProps = {
  // eslint-disable-next-line no-unused-vars
  onSavedChange?: (savedIds: string[]) => void;
};

const EmojiSlide = ({ onSavedChange }: EmojiSlideProps) => {
  const [visible, setVisible] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const center = emojis[visible];
  const isCenterSaved = savedIds.includes(center.key);
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
      const exists = prev.includes(center.key);

      let next = prev;

      if (exists) next = prev.filter((id) => id !== center.key);
      else if (prev.length < 5) next = [...prev, center.key];
      else next = prev;

      onSavedChange?.(next);
      return next;
    });
  };

  const renderLeftEmoji = () => {
    if (leftIdx < 0) {
      return <div className='w-37.5 h-full opacity-0' />;
    }

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
  };

  const renderRightEmoji = () => {
    const RightComp = emojis[rightIdx].Comp;

    if (rightIdx < emojis.length) {
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
    }
    return <div className='w-37.5 h-full opacity-0' />;
  };

  return (
    <div>
      <LayoutGroup>
        <div className='flex w-full h-full items-center justify-center gap-5'>
          <div className='w-full h-full items-center justify-center'>{renderLeftEmoji()}</div>
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
          <div className='w-full h-full items-center justify-center'>{renderRightEmoji()}</div>
        </div>
      </LayoutGroup>
      <div className='flex justify-center items-center gap-5 pt-15'>
        <EmojiSelectBar value={visible} max={emojis.length - 1} onChange={handleSelectBarChange} />
        <Checkbox checked={isCenterSaved} onChange={handleSaveClicked} label='save' />
      </div>
    </div>
  );
};

export default EmojiSlide;
