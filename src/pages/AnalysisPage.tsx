import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import Button from '@/components/common/Button';
import { MemoCard } from '@/components/common/MemoCard';
import { useNavigate } from 'react-router-dom';

const AnalysisPage = () => {
  const DUMMY_DATA = {
    dateString: '2025/12',
    title: '이번 달 회고 제목',
    content: `이번 달은 감정의 변화가 많았다. 그래도 나름 잘 버텼고, 앞으로 더 나아가고 싶다.`,
  };
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <div className='flex flex-row items-center justify-center gap-18'>
        <div className='w-70 h-100 shrink-0'>
          <MemoCard
            dateString={DUMMY_DATA.dateString}
            title={DUMMY_DATA.title}
            content={DUMMY_DATA.content}
            readOnly={true}
          />
        </div>

        <div className='flex-1 max-w-125 flex flex-col items-start justify-start bg-blue-500'>
          <h1 className='text-3xl text-white mb-2 ml-4 tracking-wide'>
            Your Analyzed
            <br />
            Emotion
          </h1>
          <EmotionAnalysisList />
        </div>
      </div>

      <div className='mt-20 flex flex-col items-center gap-6'>
        <p className='text-gray-500 text-sm italic opacity-80'>
          It is divided into Signal and Noise.
        </p>
        <Button
          type='button'
          className='w-50 py-2 rounded-full text-lg font-bold'
          onClick={() => navigate('/analysis')}
        >
          Is this Signal
        </Button>
      </div>
    </div>
  );
};

export default AnalysisPage;
