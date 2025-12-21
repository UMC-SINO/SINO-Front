import type { EmotionAnalysis } from '@/types/analyze';
import { GraphItem } from './GraphItem';

interface EmotionAnalysisListProps {
  emotions?: EmotionAnalysis[]; // API에서 받은 데이터
  className?: string;
  isLabel?: boolean;
}

const EmotionAnalysisList = ({
  emotions = [],
  className = '',
  isLabel = true,
}: EmotionAnalysisListProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <div className='mb-8'>
        {emotions.map((data) => (
          <GraphItem
            key={data.emotion_name}
            id={data.emotion_name}
            aiScore={data.percentage}
            userScore={0} // TODO : 사용자 점수 불러오기 !!!!
          />
        ))}
      </div>
      {isLabel && (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-3'>
            <div className='w-3 h-3 bg-[#FF5F5F] rounded-full' />
            <span className='text-white font-medium'>AI Analyzed Emotion</span>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-3 h-3 bg-[#F5A9A9] rounded-full' />
            <span className='text-white font-medium'>Your Analyzed Emotion</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionAnalysisList;
