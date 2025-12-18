import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';

const yearItems = ['Text', '2024', '2025', 'Unknown'];
const monthItems = ['Text', '11', '12', 'Unknown'];

export default function DateSelectPage() {
  const isContinueEnabled = true;

  const handleContinue = () => {
    console.log('Continue');
  };

  return (
    // ✅ 화면 전체를 꽉 채우는 랚퍼 + absolute 기준점
    <div className='relative min-h-screen w-full bg-[#232323]'>
      {/* ✅ 로고: 부모(relative)를 기준으로 고정 */}
      <div className='absolute left-6 top-5 flex items-center gap-2'>
        <img src='/sino-logo.svg' alt='SINO Logo' className='h-6 w-auto' />
        <span className='text-xs text-white/80'>SINO</span>
      </div>

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
              />
            </div>

            {/* Month */}
            <div className='flex flex-col items-center gap-2'>
              <div className='text-[13px] font-semibold text-[#FF6F4B]'>Month</div>
              <Dropdown
                items={yearItems}
                className='w-[320px] [&>button]:py-4 [&>button]:text-xl [&>button]:rounded-full [&>button>div]:p-1.5'
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
