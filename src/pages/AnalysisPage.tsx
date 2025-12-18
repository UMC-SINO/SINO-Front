import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import Button from '@/components/common/Button';
import { MemoCard } from '@/components/common/MemoCard';

const AnalysisPage = () => {
  const DUMMY_DATA = {
    dateString: '2025/12',
    title: '이번 달 회고 제목',
    content: `이번 달은 감정의 변화가 많았다. 그래도 나름 잘 버텼고, 앞으로 더 나아가고 싶다.`,
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black p-6 animate-in fade-in duration-1000'>
      <div className='flex flex-row items-center justify-center gap-16'>
        <div className='w-[290px] h-[391px] shrink-0 transform shadow-2xl'>
          <MemoCard
            dateString={DUMMY_DATA.dateString}
            title={DUMMY_DATA.title}
            content={DUMMY_DATA.content}
            readOnly={true}
          />
        </div>

        <div className='flex-1 w-full max-w-[480px] flex flex-col items-start justify-start'>
          <h1 className='text-3xl text-white mb-2 ml-4'>
            Your Analyzed
            <br /> Emotion
          </h1>
          <EmotionAnalysisList />
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className='mt-20 flex flex-col items-center gap-6'>
        <p className='text-gray-500 text-sm italic opacity-80'>
          It is divided into Signal and Noise.
        </p>
        <Button
          type='button'
          className='px-10 py-3 rounded-full'
          onClick={() => console.log('Confirm')}
        >
          Is this Signal
        </Button>
      </div>
    </div>
  );
};

export default AnalysisPage;
