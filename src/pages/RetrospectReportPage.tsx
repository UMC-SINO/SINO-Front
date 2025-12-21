import ReportActionBar from '@/components/report/ReportActionBar';
import TopEmotionSummary from '@/components/report/TopEmotionSummary';
import EmotionChangeSummary from '@/components/report/EmotionChangeSummary';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';

/* 감정 변화 요약 데이터 */
const EMOTION_CHANGE_ITEMS = [
  { from: 'Boredom', to: 'Boredom' },
  { from: 'Sad', to: 'Happy' },
  { from: 'Worried', to: 'Smile' },
];

/* Top 3 감정 데이터 */
const TOP_EMOTION_ITEMS: {
  emotion: 'Smile' | 'Happy' | 'Sad';
  count: number;
}[] = [
  { emotion: 'Smile', count: 2 },
  { emotion: 'Happy', count: 1 },
  { emotion: 'Sad', count: 1 },
];

const RetrospectReportPage = () => {
  return (
    <main className='pb-32 min-h-screen text-white flex flex-row'>
      <div className='flex flex-1 flex-col mt-20 mx-40 justify-center'>
        <h1 className='text-4xl font-semibold mb-20 flex gap-2'>
          <span className='text-[#FF6F4B]'>User</span>
          <span>’s </span>
          <span className='text-[#FF8C6F]'>YearMonth</span>
          <span> report</span>
        </h1>
        <div className='flex justify-center items-center gap-10 mx-60'>
          <div className='flex-1 items-center'>
            <div className='flex flex-col justify-center items-center gap-10'>
              <TopEmotionSummary year='2025' items={TOP_EMOTION_ITEMS} />
              <EmotionChangeSummary
                count={EMOTION_CHANGE_ITEMS.length}
                items={EMOTION_CHANGE_ITEMS}
              />
            </div>
          </div>
          <div className=' flex-1 items-center '>
            <EmotionAnalysisList />
          </div>
        </div>
      </div>
      <ReportActionBar />
    </main>
  );
};

export default RetrospectReportPage;
