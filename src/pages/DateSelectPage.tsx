import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { selectedDateTimeAtom } from '@/atoms';

const yearItems = ['Text', '2023', '2024', '2025', 'Unknown', ''];
const monthItems = [
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

export default function DateSelectPage() {
  const [selectedYear, setSelectedYear] = useState('Text');
  const [selectedMonth, setSelectedMonth] = useState('Text');

  const setSelectedDateTime = useSetAtom(selectedDateTimeAtom);
  const navigate = useNavigate();

  const isValid = (v: string) => v !== 'Text' && v !== '' && v !== 'Unknown';
  const isContinueEnabled = isValid(selectedYear) && isValid(selectedMonth);

  const handleContinue = () => {
    const year = selectedYear;
    const month = selectedMonth.padStart(2, '0'); // 12 → 12, 1 → 01

    // YYYY-MM-DD HH:mm:ss
    const formattedDateTime = `${year}-${month}-01 00:00:00`;

    // jotai 전역 저장
    setSelectedDateTime(formattedDateTime);

    console.log('저장된 날짜:', formattedDateTime);

    navigate('/emoji');
  };

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center px-6'>
      <div className='flex flex-col items-center'>
        <div className='flex items-start gap-4'>
          {/* Year */}
          <div className='flex flex-col items-center gap-2'>
            <div className='text-lg font-semibold text-white/90'>
              Choose the <span className='text-[#FF6F4B]'>Year</span>
            </div>

            <Dropdown
              items={yearItems}
              className={clsx(
                'w-120 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5',
              )}
              onSelect={(value) => setSelectedYear(value)}
            />
          </div>

          {/* Month */}
          <div className='flex flex-col items-center gap-2'>
            <div className='text-lg font-semibold text-[#FF6F4B]'>Month</div>
            <Dropdown
              items={monthItems}
              className={clsx(
                'w-50 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5',
              )}
              onSelect={(value) => setSelectedMonth(value)}
            />
          </div>
        </div>

        <div className='mt-30'>
          <Button
            type='button'
            disabled={!isContinueEnabled}
            onClick={handleContinue}
            className='py-2 mt-15 rounded-full'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
