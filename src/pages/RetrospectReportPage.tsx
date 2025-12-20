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
    <main className='overflow-y-auto pb-32 min-h-screen text-white justify-center items-center flex '>
      <div className='max-w-250 mx-auto px-6 py-16 mt-10'>
        <h1 className='text-3xl font-semibold mb-12'>
          <span className='text-[#FF6F4B]'>User</span>
          <span>’s </span>
          <span className='text-[#FF8C6F]'>YearMonth</span>
          <span> report</span>
        </h1>

        <div className='grid grid-cols-[380px_1fr] gap-20 items-start'>
          <div className='flex flex-col gap-20'>
            <EmotionAnalysisList />

            <TopEmotionSummary year='2025' items={TOP_EMOTION_ITEMS} />

            <EmotionChangeSummary
              count={EMOTION_CHANGE_ITEMS.length}
              items={EMOTION_CHANGE_ITEMS}
            />
          </div>
        </div>
      </div>
      <ReportActionBar />
    </main>
  );
};

export default RetrospectReportPage;
