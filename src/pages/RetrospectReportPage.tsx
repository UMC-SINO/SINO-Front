import { useLocation } from 'react-router-dom';
import TopEmotionSummary from '@/components/report/TopEmotionSummary';
import EmotionChangeSummary from '@/components/report/EmotionChangeSummary';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import ReportActionBar from '@/components/report/ReportActionBar';
import type { ReportApiResponse } from '@/types/report';

const RetrospectReportPage = () => {
  const location = useLocation();
  const reportData = location.state?.reportData as ReportApiResponse | undefined;

  if (!reportData) return <div>보고서 데이터를 불러오는 중입니다...</div>;

  const { success } = reportData;

  // Top 3 감정 정렬
  const sortedTopEmotions = Object.entries(success?.emotionCounts)
    .map(([emotion, count]) => ({ emotion, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // 감정 변화 요약
  const EMOTION_CHANGE_ITEMS = success?.modifiedEmotionBundles.map((bundle) => ({
    from: bundle.modifiedFalseEmotions[0] || '',
    to: bundle.modifiedTrueEmotions[0] || '',
  }));

  // EmotionAnalysisList용 데이터
  const emotionAnalysisData = Object.entries(success?.aiEmotionCounts).map(
    ([emotion_name, count]) => ({
      emotion_name,
      percentage: Number(count), // 필요 시 퍼센트 계산 로직 적용 가능
    }),
  );

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
              <TopEmotionSummary year='2025' emotionCounts={sortedTopEmotions} />
              <EmotionChangeSummary
                count={EMOTION_CHANGE_ITEMS.length}
                items={EMOTION_CHANGE_ITEMS}
              />
            </div>
          </div>

          <div className='flex-1 items-center'>
            <EmotionAnalysisList emotions={emotionAnalysisData} />
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
