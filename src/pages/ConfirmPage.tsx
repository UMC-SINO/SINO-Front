import { useState } from 'react';
import { RetrospectMainBlock } from '@/components/retro/RetroWrite';
import Button from '@/components/common/Button';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';

export const RetrospectFlowPage = () => {
  const [step, setStep] = useState<'write' | 'confirm' | 'analysis'>('write');

  const handleBack = () => console.log('Back clicked');
  const handleSave = () => setStep('confirm');
  const handleAnalyze = () => setStep('analysis');
  const handleIsSignal = () => console.log('Is this Signal clicked');

  return (
    <div className='min-h-screen flex flex-1 justify-center  items-center flex-col p-6 text-white'>
      <div className=' flex flex-col w-full justify-center items-center gap-8'>
        {step === 'write' ? (
          <div className='max-w-5xl w-2/5'>
            <RetrospectMainBlock editable />
          </div>
        ) : (
          <div className='grid grid-cols-4 gap-5 w-full max-w-6xl'>
            <div className='col-span-2'>
              <RetrospectMainBlock editable={false} />
            </div>

            <div className='flex flex-col justify-center items-center text-center h-full'>
              {step === 'confirm' ? (
                <h1 className='text-2xl leading-loose ml-20 mt-5'>
                  is your <span className='text-4xl'>Signal</span> or
                  <br />
                  <span className='text-5xl ml-32'>Noise?</span>
                </h1>
              ) : (
                <>
                  <h1 className='text-3xl mb-4'>Your Analyzed Emotion</h1>
                  <EmotionAnalysisList />
                </>
              )}
            </div>
          </div>
        )}
      </div>

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
