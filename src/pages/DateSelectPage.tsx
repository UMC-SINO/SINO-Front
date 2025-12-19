import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const yearItems = ['Text', '2024', '2025', 'Unknown'];
const monthItems = ['Text', '11', '12', 'Unknown'];

export default function DateSelectPage() {
  const [selectedYear, setSelectedYear] = useState('Text');
  const [selectedMonth, setSelectedMonth] = useState('Text');

  const isContinueEnabled = selectedYear !== 'Text' && selectedMonth !== 'Text';

  const navigate = useNavigate();

  const handleContinue = () => {
    console.log('선택:', { year: selectedYear, month: selectedMonth });
    // TODO: navigate(`/next?year=${selectedYear}&month=${selectedMonth}`);
    navigate('/emoji');
  };

  return (
    // 화면 전체를 꽉 채우는 랚퍼 + absolute 기준점
    <div className='relative min-h-screen w-full flex items-center justify-center px-6'>
      <div className='flex flex-col items-center'>
        {/* 드롭다운 2개 */}
        <div className='flex items-start gap-4'>
          {/* Year */}
          <div className='flex flex-col items-center gap-2'>
            <div className='text-lg font-semibold text-white/90'>
              Choose the <span className='text-[#FF6F4B]'>Year</span>
            </div>

            <Dropdown
              items={yearItems}
              className={clsx(
                // 1) 기본 레이아웃
                'w-120 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5',

                // 2) 선택된 값에 따른 텍스트 색상
                selectedYear === 'Text' ? '[&>button]:text-[#969392]' : '[&>button]:text-black',
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
                // 1) 기본 레이아웃
                'w-50 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5',

                // 2) 선택된 값에 따른 텍스트 색상
                selectedMonth === 'Text' ? '[&>button]:text-[#969392]' : '[&>button]:text-black',
              )}
              onSelect={(value) => setSelectedMonth(value)}
            />
          </div>
        </div>

        {/* Continue 버튼 */}
        <div className='mt-30'>
          <Button
            type='button'
            disabled={!isContinueEnabled}
            onClick={handleContinue}
            className='py-2 rounded-full'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
