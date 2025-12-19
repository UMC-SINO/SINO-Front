import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Splash1Icon, Splash2Icon } from '@/assets';
import { useNavigate } from 'react-router-dom';

const YearItems = ['Text', '2021', '2022', '2023', '2024', '2025', ''];
const MonthItems = [
  'Text',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'Unknown',
  '',
];

const fade = {
  hidden: { opacity: 0, y: 0 },
  show: { opacity: 1, y: 0 },
};

const SplashPage = () => {
  const [year, setYear] = useState('Text');
  const [month, setMonth] = useState('Text');

  const navigate = useNavigate();

  const isValid = (v: string) => v !== 'Text' && v !== '';
  const canGoNext = isValid(year) && isValid(month);

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#0F0F10]'>
      <motion.div
        initial='hidden'
        animate='show'
        variants={fade}
        transition={{ duration: 3, ease: 'easeOut', delay: 0.1 }}
        className='pointer-events-none'
      >
        <Splash1Icon className='absolute left-0 top-1/2 -translate-y-1/2 w-190' />
      </motion.div>
      <div className='relative z-10 flex min-h-screen flex-col justify-between px-8 py-10'>
        <div className='flex flex-1 items-center justify-center'>
          <motion.div
            initial='hidden'
            animate='show'
            variants={fade}
            transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
            className='flex items-center gap-4 pl-90 pt-10'
          >
            <p className='text-white text-3xl font-pretendard font-semibold whitespace-nowrap'>
              Making sense of your
            </p>
            <Dropdown
              items={YearItems}
              className='min-w-35'
              onSelect={(value: string) => setYear(value)}
            />
            <Dropdown
              items={MonthItems}
              className='min-w-35'
              onSelect={(value: string) => setMonth(value)}
            />
          </motion.div>
          <motion.div
            initial='hidden'
            animate='show'
            variants={fade}
            transition={{ duration: 3, ease: 'easeOut', delay: 1 }}
          >
            <Splash2Icon className='absolute right-0 top-[47%] -translate-y-1/2 translate-x-24 w-120 pointer-events-none' />
          </motion.div>
        </div>
        <div className='flex items-center justify-between'>
          <Button
            type='button'
            onClick={() => navigate(-1)}
            className='w-62.5 bg-[#E1E0E0]! text-[#7C7979]'
          >
            Back
          </Button>
          <Button
            type='button'
            onClick={() => navigate('/retro-report')}
            className='w-62.5 disabled:bg-[#E1E0E0] disabled:text-[#7C7979]'
            disabled={!canGoNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
