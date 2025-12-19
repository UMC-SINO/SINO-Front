import { motion } from 'framer-motion';
import { RetrospectMainBlock } from '@/components/retro/RetroWrite';
import Button from '@/components/common/Button';

const RetrospectWrite = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-black'>
      <motion.div layoutId='retrospect-block' className='w-full max-w-5xl'>
        <RetrospectMainBlock editable />
      </motion.div>

      <Button type='button' className='mt-6 px-6 py-2' onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
};

export default RetrospectWrite;
