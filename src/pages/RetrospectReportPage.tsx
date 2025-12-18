import EmotionChangeSummary from '@/components/common/report/EmotionChangeSummary';
import ReportCard from '@/components/common/report/ReportCard';
import TopEmotionSummary from '@/components/common/report/TopEmotionSummary';
import ActionBar from '@/components/common/ReportActionBar';

const RetrospectReportPage = () => {
  return (
    <div className='min-h-screen bg-[#111111] text-white'>
      <main className='min-h-screen overflow-y-auto pb-32'>
        <div className='max-w-[1000px] mx-auto px-6 py-16'>
          <h1 className='text-xl font-semibold mb-10'>
            <span className='text-[#FF6F4B]'>User</span>
            <span>’s </span>
            <span className='text-[#FF8C6F]'>YearMonth</span>
            <span> report</span>
          </h1>

          <div className='grid grid-cols-[380px_1fr] gap-16 items-start'>
            <ReportCard title='User’s Year report' content='내용' />

            <div className='flex flex-col gap-16'>
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
                  <div key={item.label} className='flex items-center gap-4'>
                    <div className='w-6 h-6 bg-white/20 rounded-full shrink-0' />
                    <span className='w-24 text-sm'>{item.label}</span>
                    <div className='flex-1 h-4 bg-white/10 rounded-full overflow-hidden'>
                      <div className='h-full bg-[#FF6F4B]' style={{ width: `${item.value}%` }} />
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
      </main>

      <ActionBar />
    </div>
  );
};

export default RetrospectReportPage;
