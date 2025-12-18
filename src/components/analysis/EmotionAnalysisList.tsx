import { ANALYSIS_DATA } from '@/constants/analysisData';
import { GraphItem } from './GraphItem';

const EmotionAnalysisList: React.FC = () => {
  return (
    <div className='w-[335px] h-[233px] p-5 bg-bl shadow-lg'>
      <div className='h--173px mb-8'>
        {/**REVIEW: 추출되는 5개의 이모지를 백엔드에서 넘겨주는건지 or 랜덤인건지 or 고정되어있는건지 */}
        {ANALYSIS_DATA.map((data) => (
          <GraphItem key={data.id} id={data.id} aiScore={data.aiScore} userScore={data.userScore} />
        ))}
      </div>
      <div className='flex flex-col gap-2 '>
        <div className='flex items-center gap-3'>
          <div className='w-3 h-3 bg-[#FF5F5F] rounded-full' />
          <span className=' text-white'>AI Analyzed Emotion</span>
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-3 h-3 bg-[#F5A9A9] rounded-full' />
          <span className=' text-white'>Your Analyzed Emotion</span>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysisList;
