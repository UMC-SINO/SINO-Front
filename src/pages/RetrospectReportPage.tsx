import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import EmotionChangeSummary from '@/components/report/EmotionChangeSummary';
import ReportActionBar from '@/components/report/ReportActionBar';
import TopEmotionSummary from '@/components/report/TopEmotionSummary';
import type { ReportApiResponse } from '@/types/report';
import { useLocation } from 'react-router-dom';

const RetrospectReportPage = () => {
  const location = useLocation();
  const reportData = location.state?.reportData as ReportApiResponse | undefined;
  const year = location.state?.year as number | undefined;

  if (!reportData) return <div>보고서 데이터를 불러오는 중입니다...</div>;

  const { success } = reportData;

  if (
    !reportData ||
    !success ||
    !success.emotionCounts ||
    Object.keys(success.emotionCounts).length === 0
  ) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center text-white text-xl'>데이터가 없습니다.</div>
      </div>
    );
  }

  const sortedTopEmotions = Object.entries(success.emotionCounts)
    .map(([emotion, count]) => ({ emotion, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const EMOTION_CHANGE_ITEMS =
    success?.modifiedEmotionBundles.map((bundle) => ({
      from: bundle.modifiedFalseEmotions[0] || '',
      to: bundle.modifiedTrueEmotions[0] || '',
    })) || [];

  return (
    <main className='pb-32 min-h-screen text-white flex flex-row'>
      <div className='flex flex-1 flex-col mt-20 mx-40 justify-center'>
        <h1 className='text-4xl font-semibold mb-20 flex gap-2'>
          <span className='text-[#FF6F4B]'>User</span>
          <span>’s </span>
          <span className='text-[#FF8C6F]'>{year}</span>
          <span> report</span>
        </h1>

        <div className='flex justify-center items-center gap-10 mx-60'>
          <div className='flex-1 items-center'>
            <div className='flex flex-col justify-center items-center gap-10'>
              <TopEmotionSummary year={year?.toString() ?? ''} emotionCounts={sortedTopEmotions} />
              <EmotionChangeSummary
                count={EMOTION_CHANGE_ITEMS.length}
                items={EMOTION_CHANGE_ITEMS}
              />
            </div>
          </div>

          <div className='flex-1 items-center'>
            <EmotionAnalysisList emotions={success?.aiEmotionPercentages} />
          </div>
        </div>
      </div>

      <ReportActionBar
        onReportCreated={() => {
          /* 필요 시 액션 */
        }}
      />
    </main>
  );
};

export default RetrospectReportPage;
