import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const items = Array.from({ length: 5 }, (_, i) => ({
  title: `Report 202${i + 1}`,
}));

const getOffset = (index: number, activeIndex: number, length: number) => {
  const raw = index - activeIndex;
  const half = Math.floor(length / 2);
  if (raw > half) return raw - length;
  if (raw < -half) return raw + length;
  return raw;
};

const ReportView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  const navigate = useNavigate();

  const movePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const moveNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-dvh'>
      <div className='text-white flex flex-col w-full max-w-3xl'>
        <h1 className='text-3xl font-medium mb-4'>
          <span className='text-[#FF6F4B]'>User</span>'s Previous report
        </h1>
        <p>
          💌 There are <span className='text-[#FF6F4B] font-semibold'>{total}</span> saved
        </p>
      </div>

      <div className='relative w-full max-w-5xl h-120 flex items-center justify-center overflow-hidden mt-5'>
        <button
          onClick={movePrev}
          className='absolute left-0 z-20 p-3 rounded-full bg-inherit hover:bg-white/10 transition cursor-pointer'
        >
          <ChevronLeft className='text-white w-12 h-12' />
        </button>

        {items.map((item, index) => {
          const offset = getOffset(index, activeIndex, total);

          return (
            <motion.div
              key={item.title}
              animate={{
                x: offset * 250,
                scale: offset === 0 ? 1 : 0.8,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                zIndex: offset === 0 ? 10 : 5,
                backgroundColor: offset === 0 ? '#7A7876' : '#3F3E3D',
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              className='absolute w-70 h-95 rounded-xl cursor-pointer bg-[#62605F] shadow-xl flex items-end justify-center p-4 '
            >
              <h2 className='text-lg font-semibold text-white'>{item.title}</h2>
            </motion.div>
          );
        })}

        <button
          onClick={moveNext}
          className='absolute right-0 z-20 p-3 rounded-full bg-inherit hover:bg-white/10 transition cursor-pointer'
        >
          <ChevronRight className='text-white w-12 h-12' />
        </button>
      </div>

      <Button type='button' onClick={() => navigate(-1)} className=' w-50'>
        Back
      </Button>
    </div>
  );
};

export default ReportView;
