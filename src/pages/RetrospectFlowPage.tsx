import { useState } from 'react';
import Button from '@/components/common/Button';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RetrospectMainBlock } from '@/components/retro/RetrospectMainBlock';

const RetrospectFlowPage = () => {
  const [step, setStep] = useState<'write' | 'confirm' | 'analysis'>('write');
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleSave = () => setStep('confirm');
  const handleAnalyze = () => setStep('analysis');
  const handleIsSignal = () => navigate('/');
  return (
    <div className='min-h-screen flex flex-1 justify-center  items-center flex-col p-6 text-white'>
      <div className=' flex flex-col w-full justify-center items-center gap-8'>
        {step === 'write' ? (
          <div className='max-w-5xl w-2/5'>
            <RetrospectMainBlock editable />
          </div>
        ) : (
          <motion.div
            className='flex flex-col items-start justify-start'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
          >
            <div className='grid grid-cols-4 gap-5 w-full max-w-6xl'>
              <div className='col-span-2'>
                <RetrospectMainBlock editable={false} />
              </div>

              <div className='flex flex-col w-100 justify-center items-center text-center h-full'>
                {step === 'confirm' ? (
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
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/** 버튼 모음집 ~ */}
      <div className='flex justify-center gap-8 mt-20'>
        {step === 'write' && (
          <>
            <Button
              type='button'
              className='px-6 py-2 rounded-full text-lg font-bold bg-gray-300 text-[#7C7979]'
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type='button'
              className='px-6 py-2 rounded-full text-lg font-bold'
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        )}
        {step === 'confirm' && (
          <Button
            type='button'
            className='w-50 py-2 rounded-full text-lg font-bold'
            onClick={handleAnalyze}
          >
            Analyze
          </Button>
        )}
        {step === 'analysis' && (
          <Button
            type='button'
            className='w-50 py-2 rounded-full text-lg font-bold'
            onClick={handleIsSignal}
          >
            Is this Signal
          </Button>
        )}
      </div>
    </div>
  );
};

export default RetrospectFlowPage;
