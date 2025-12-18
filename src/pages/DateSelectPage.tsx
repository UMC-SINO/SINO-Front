import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useState } from 'react';

const yearItems = ['Text', '2024', '2025', 'Unknown'];
const monthItems = ['Text', '11', '12', 'Unknown'];

export default function DateSelectPage() {
  const [selectedYear, setSelectedYear] = useState('Text');
  const [selectedMonth, setSelectedMonth] = useState('Text');

  const isContinueEnabled = selectedYear !== 'Text' && selectedMonth !== 'Text';

  const handleContinue = () => {
    console.log('선택:', { year: selectedYear, month: selectedMonth });
    // TODO: navigate(`/next?year=${selectedYear}&month=${selectedMonth}`);
  };

  return (
    // ✅ 화면 전체를 꽉 채우는 랚퍼 + absolute 기준점
    <div className='relative min-h-screen w-full bg-[#232323]'>
      {/* ✅ 가운데 정렬 컨테이너 (세로/가로) */}
      <div className='min-h-screen w-full flex items-center justify-center px-6'>
        <div className='flex flex-col items-center'>
          {/* 드롭다운 2개 */}
          <div className='flex items-start gap-10'>
            {/* Year */}
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[13px] font-semibold text-white/90'>
                Choose the <span className='text-[#FF6F4B]'>Year</span>
              </div>

              <Dropdown
                items={yearItems}
                className='w-[320px] [&>button]:py-4 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5'
                onSelect={(value) => setSelectedYear(value)}
              />
            </div>

            {/* Month */}
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[13px] font-semibold text-[#FF6F4B]'>Month</div>
              <Dropdown
                items={monthItems}
                className='w-[320px] [&>button]:py-4 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5'
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
              className='w-[180px] h-[52px] rounded-full'
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
