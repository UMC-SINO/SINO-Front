import Button from '@/components/common/Button';
import { usePostReport } from '@/hooks/usePostReport';
import { useNavigate } from 'react-router-dom';
import type { ReportApiResponse } from '@/types/report';

interface Props {
  onReportCreated: (data: ReportApiResponse) => void;
}

const ReportActionBar = ({ onReportCreated }: Props) => {
  const navigate = useNavigate();
  const { mutate: createReport, isLoading } = usePostReport();

  const handleAddSignal = () => {
    navigate('/retro');
  };

  const handleCreateReport = () => {
    createReport(
      { year: 2025, month: 12, userId: 1 },
      {
        onSuccess: (res) => {
          console.log('보고서 생성 성공:', res);
          onReportCreated(res); // 부모로 데이터 전달
          navigate('/'); // 필요 시 페이지 이동
        },
        onError: (err) => {
          console.error('보고서 생성 실패:', err);
        },
      },
    );
  };

  return (
    <footer className='fixed bottom-0 left-0 w-full bg-bgColor border]'>
      <div className='max-w-250 mx-auto px-6 py-5 flex justify-center gap-6'>
        <Button
          type='button'
          className='text-[#FF6F4B] bg-bgColor border-2 border-[#FF6F4B] rounded-full'
          onClick={handleAddSignal}
        >
          Add signal
        </Button>

        <Button
          type='button'
          className='text-bgColor bg-[#FF6F4B] border-2 border-[#FF6F4B] rounded-full py-2'
          onClick={handleCreateReport}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create the report'}
        </Button>
      </div>
    </footer>
  );
};

export default ReportActionBar;
