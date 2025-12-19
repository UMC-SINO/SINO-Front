import { ANALYSIS_DATA } from '@/data/analysisData';
import { GraphItem } from './GraphItem';

interface EmotionAnalysisListProps {
  isLabel?: boolean;
  className?: string;
}

const EmotionAnalysisList = ({ isLabel = true, className = '' }: EmotionAnalysisListProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <div className='mb-8'>
        {ANALYSIS_DATA.map((data) => (
          <GraphItem key={data.id} id={data.id} aiScore={data.aiScore} userScore={data.userScore} />
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
