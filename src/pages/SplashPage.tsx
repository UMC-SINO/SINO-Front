import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import Splash01 from '../assets/splash/Splash01.svg?react';
import Splash02 from '../assets/splash/Splash02.svg?react';
import { useState } from 'react';

const YearItems = ['2021', '2022', '2023', '2024', '2025'];
const MonthItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Unknown'];

const SplashPage = () => {
  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  const canGoNext = Boolean(year && month);

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#0F0F10]'>
      <Splash01 className='absolute left-0 top-1/2 -translate-y-1/2 w-[500px] md:w-[800px] pointer-events-none' />
      <Splash02 className='absolute right-0 top-[47%] -translate-y-1/2 translate-x-25 w-[420px] md:w-[520px] pointer-events-none' />
      <div className='relative z-10 flex min-h-screen flex-col justify-between px-8 py-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='flex items-center gap-4 pl-90 pt-10'>
            <p className='text-white text-3xl font-pretendard font-semibold whitespace-nowrap'>
              Making sense of your
            </p>
            <Dropdown
              items={YearItems}
              className='min-w-[140px]'
              onChange={(value: string) => setYear(value)}
            />
            <Dropdown
              items={MonthItems}
              className='min-w-[140px]'
              onChange={(value: string) => setMonth(value)}
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Button type='button' className='w-[250px] bg-[#E1E0E0] text-[#7C7979]'>
            Back
          </Button>
          <Button
            type='button'
            className='w-[250px] disabled:bg-[#E1E0E0] disabled:text-[#7C7979]'
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
