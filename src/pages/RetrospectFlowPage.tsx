/* eslint-disable no-unused-vars */

import { useState } from 'react';
import Button from '@/components/common/Button';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import { LayoutGroup, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RetrospectMainBlock } from '@/components/retro/RetrospectMainBlock';

const RetrospectFlowPage = () => {
  const [step, setStep] = useState<'write' | 'confirm' | 'analysis'>('write');
  const [analysisResult, setAnalysisResult] = useState<'Signal' | 'Noise' | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 임시 테스트용
  const tempResult: 'Signal' | 'Noise' = 'Signal';

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleSave = () => setStep('confirm');
  const handleAnalyze = () => setStep('analysis');
  const handleIsSignal = () => navigate('/');
  return (
    <div className='min-h-screen flex justify-center items-center flex-col p-6 text-white'>
      <div className=' flex flex-col w-full justify-center items-center gap-8'>
        <LayoutGroup>
          {step === 'write' ? (
            <motion.div layout className=''>
              <RetrospectMainBlock
                editable={true}
                image={previewImage}
                onChangeImage={setPreviewImage}
              />
            </motion.div>
          ) : (
            <motion.div
              layout
              className='flex flex-col items-start justify-start'
              initial={{ x: 300, opacity: 0, scale: 1.02 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
            >
              <div className='grid grid-cols-2 gap-5 w-full max-w-6xl'>
                <div className='scale-[0.8] w-[115%] origin-center'>
                  <RetrospectMainBlock
                    editable={false}
                    image={previewImage}
                    onChangeImage={setPreviewImage}
                  />
                </div>

                <div className='flex flex-col justify-center items-start h-full ml-8'>
                  {step === 'confirm' ? (
                    <motion.h1
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.7, // ← RetrospectMainBlock 이동 끝난 뒤
                        type: 'spring',
                        stiffness: 70,
                        damping: 18,
                      }}
                      className='text-2xl text-white text-center'
                      style={{ width: '335px' }}
                    >
                      is your <span className='text-3xl'>Signal</span> or
                      <br />
                      <span className='text-3xl ml-50'>Noise?</span>
                    </motion.h1>
                  ) : (
                    <div className='flex flex-col w-full max-w-120'>
                      <h1 className='text-3xl text-white mb-6 tracking-wide text-left'>
                        Your Analyzed
                        <br />
                        Emotion
                      </h1>

                      <EmotionAnalysisList />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </LayoutGroup>
      </div>

      {/* 버튼 모음집 ~ */}
      <div className='flex justify-center gap-8 mt-10 text-black'>
        {step === 'write' && (
          <>
            <Button
              type='button'
              className='px-6 py-2  w-[228px] rounded-full text-lg font-medium bg-gray-300 text-[#7C7979] mt-7'
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type='button'
              className='px-6 py-2  w-[228px] rounded-full text-lg font-medium mt-7'
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        )}
        {step === 'confirm' && (
          <Button
            type='button'
            className=' w-[228px] py-2 rounded-full text-lg font-medium mt-7'
            onClick={handleAnalyze}
          >
            Analyze
          </Button>
        )}
        {step === 'analysis' && (
          <div className='flex flex-col items-center justify-center'>
            <p className='text-gray-500 text-sm opacity-80 mb-2'>
              It is divided into Signal and Noise.
            </p>
            <Button
              type='button'
              className={`w-[228px] py-2 rounded-full text-lg cursor-def ${
                tempResult === 'Signal' ? 'bg-[#FF6F4B]' : 'bg-[#FFB7A5]'
              }`}
              onClick={handleIsSignal}
            >
              {`It is ${tempResult}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrospectFlowPage;
