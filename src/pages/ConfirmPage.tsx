import Button from '@/components/common/Button';
import { MemoCard } from '@/components/common/MemoCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';

const DUMMY_DATA = {
  dateString: '2025/12',
  title: '이번 달 회고 제목',
  content: `이번 달은 감정의 변화가 많았다. 그래도 나름 잘 버텼고, 앞으로 더 나아가고 싶다.`,
};

const ConfirmPage = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <div className='flex flex-row items-center justify-center gap-20'>
        <motion.div
          className='w-70 h-100 shrink-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <MemoCard
            dateString={DUMMY_DATA.dateString}
            title={DUMMY_DATA.title}
            content={DUMMY_DATA.content}
            readOnly={true}
          />
        </motion.div>

        <motion.div
          className='flex-1 w-100 flex flex-col items-start justify-start'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {!showAnalysis ? (
            <h1
              className='text-2xl text-white leading-loose text-center'
              style={{ width: '335px' }}
            >
              is your <span className='text-4xl'>Signal</span> or
              <br />
              <span className='text-5xl ml-55'>Noise?</span>
            </h1>
          ) : (
            <>
              <h1 className='text-3xl text-white mb-2 tracking-wide'>
                Your Analyzed
                <br />
                Emotion
              </h1>
              <EmotionAnalysisList />
            </>
          )}
        </motion.div>
      </div>

      {/* 버튼 그룹 */}
      <motion.div
        className='mt-30 flex flex-col items-center gap-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {!showAnalysis ? (
          <>
            <p className='text-[#AFADAC] text-xs italic opacity-80'>
              <br />
            </p>
            <Button
              type='button'
              className='w-50 py-2 rounded-full text-lg font-bold'
              onClick={() => setShowAnalysis(true)}
            >
              Analyze
            </Button>
          </>
        ) : (
          <>
            <p className='text-[#AFADAC] text-xs italic opacity-80'>
              It is divided into Signal and Noise.
            </p>
            <Button
              type='button'
              className='w-50 py-2 rounded-full text-lg font-bold'
              onClick={() => alert('Signal 확인!')}
            >
              Is this Signal
            </Button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ConfirmPage;
