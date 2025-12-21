import ReportActionBar from '@/components/report/ReportActionBar';
import TopEmotionSummary from '@/components/report/TopEmotionSummary';
import EmotionChangeSummary from '@/components/report/EmotionChangeSummary';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonthReport, getYearReport } from '@/api/report';
import type { EmotionAnalysis } from '@/types/analyze';
import type { ReportResponse } from '@/types/report';

type Props = {
  year: number;
  month?: number; // 있으면 월 리포트, 없으면 연도 리포트
};

const RetrospectReportPage = ({ year, month }: Props) => {
  // 테스트용 임시 year 값
  const resolvedYear = year ?? 2025;

  const {
    data: report,
    isLoading,
    isError,
  } = useQuery<ReportResponse>({
    queryKey: ['report', resolvedYear, month],
    queryFn: () =>
      month !== undefined ? getMonthReport(resolvedYear, month) : getYearReport(resolvedYear),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!report) return;

    console.log(`✅ ${resolvedYear}년 리포트 생성 완료`);
  }, [report, resolvedYear]);

  const topEmotionItems = useMemo(() => {
    if (!report) return [];

    return (Object.entries(report.emotionCounts) as [string, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([emotion, count]) => ({
        emotion,
        count,
      }));
  }, [report]);

  const emotionChangeItems = useMemo(() => {
    if (!report) return [];

    return report.modifiedEmotionBundles
      .filter(
        (bundle) =>
          bundle.modifiedFalseEmotions.length > 0 && bundle.modifiedTrueEmotions.length > 0,
      )
      .slice(0, 3) // 최근 3개
      .map((bundle) => ({
        from: bundle.modifiedFalseEmotions[0],
        to: bundle.modifiedTrueEmotions[0],
      }));
  }, [report]);

  const aiEmotionList = useMemo<EmotionAnalysis[]>(() => {
    if (!report) return [];

    return Object.entries(report.aiEmotionCounts).map(([emotion_name, count]) => ({
      emotion_name,
      percentage: count,
    }));
  }, [report]);

  if (isLoading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (isError || !report) {
    return <div className='text-red-400'>리포트를 불러오지 못했습니다.</div>;
  }

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
              <TopEmotionSummary year='2025' items={topEmotionItems} />
              <EmotionChangeSummary count={emotionChangeItems.length} items={emotionChangeItems} />
            </div>
          </div>

          <div className='flex-1 items-center'>
            <EmotionAnalysisList emotions={aiEmotionList} />
          </div>
        </div>
      </div>

      <ReportActionBar />
    </main>
  );
};

export default RetrospectReportPage;
