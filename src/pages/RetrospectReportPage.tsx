import EmotionChangeSummary from '@/components/common/report/EmotionChangeSummary';
import ReportCard from '@/components/common/report/ReportCard';
import TopEmotionSummary from '@/components/common/report/TopEmotionSummary';

const RetrospectReportPage = () => {
  return (
    <div className='min-h-screen bg-[#111111] text-white flex items-center justify-center'>
      <div className='w-full max-w-[1000px] px-6 py-16'>
        <h1 className='text-xl font-semibold mb-6'>
          <span className='text-[#FF6F4B]'>User</span> <span>’s</span>{' '}
          <span className='text-[#FF8C6F]'>YearMonth</span> <span>report</span>
        </h1>

        <div className='grid grid-cols-[380px_1fr] gap-16 items-stretch'>
          <div className='h-full'>
            <ReportCard title='User’s Year report' content='내용' />
          </div>

          <div className='h-full flex flex-col justify-between'>
            <div className='w-full max-w-[460px] flex flex-col gap-16'>
              {/* 감정 바 리스트 - 머지 후 수정 예정*/}
              <div className='flex flex-col gap-5'>
                {[
                  { label: 'Happy', value: 80 },
                  { label: 'Afraid', value: 60 },
                  { label: 'Angry', value: 45 },
                  { label: 'Boredom', value: 30 },
                  { label: 'Sad', value: 25 },
                  { label: 'Shameful', value: 20 },
                  { label: 'Unrest', value: 15 },
                  { label: 'Worried', value: 10 },
                  { label: 'Smile', value: 5 },
                ].map((item) => (
                  <div key={item.label} className='flex items-center gap-4 w-full'>
                    {/* 이모지 */}
                    <div className='w-6 h-6 bg-white/20 rounded-full shrink-0' />
                    <span className='w-24 text-sm shrink-0'>{item.label}</span>
                    <div className='w-full h-4 bg-white/10 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-[#FF6F4B] rounded-full'
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <TopEmotionSummary year='2025' items={[{ count: 2 }, { count: 1 }, { count: 1 }]} />

              <EmotionChangeSummary
                count={3}
                items={[
                  { from: 'Boredom', to: 'Boredom' },
                  { from: 'Sad', to: 'Happy' },
                  { from: 'Worried', to: 'Smile' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrospectReportPage;
