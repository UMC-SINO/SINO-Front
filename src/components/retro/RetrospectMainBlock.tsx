import { motion } from 'framer-motion';
import { PhotoGrid } from '@/components/common/PhotoGrid';
import { EmotionChips } from '@/components/common/Emotionchips';
import { MemoCard } from '@/components/common/MemoCard';
import { WRITE_DATA } from '@/data/writeData';

export const RetrospectMainBlock = ({ editable }: { editable: boolean }) => {
  return (
    <motion.div
      layoutId='retrospect-block'
      layout
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center p-4 rounded-xl w-full max-w-2xl'
      style={{ willChange: 'transform' }}
    >
      <div className='flex flex-col gap-6'>
        <PhotoGrid photos={WRITE_DATA.photos} />
        <EmotionChips emotions={WRITE_DATA.emotions} />
      </div>

      <MemoCard
        dateString={WRITE_DATA.dateString}
        title={WRITE_DATA.title}
        content={WRITE_DATA.content}
        {...(editable ? {} : { readOnly: true })}
      />
    </motion.div>
  );
};
