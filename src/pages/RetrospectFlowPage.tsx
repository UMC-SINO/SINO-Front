import { useState } from 'react';
import Button from '@/components/common/Button';
import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import { LayoutGroup, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RetrospectMainBlock } from '@/components/retro/RetrospectMainBlock';
import type { RetrospectStep } from '@/types/retrospect';
import { usePostAnalyze } from '@/hooks/usePostAnalyze';
import type { EmotionAnalysis } from '@/types/analyze';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  retrospectContentAtom,
  retrospectPhotoAtom,
  retrospectTitleAtom,
  selectedDateTimeAtom,
  selectedEmojisAtom,
} from '@/atoms';
import { postWrite } from '@/api/postApi';
import { pickData } from '@/types/common';

const RetrospectFlowPage = () => {
  const [step, setStep] = useState<RetrospectStep>('write');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [analysisResult, setAnalysisResult] = useState<'Signal' | 'Noise' | null>(null);
  const [emotions, setEmotions] = useState<EmotionAnalysis[]>([]);
  const navigate = useNavigate();

  const [selectedDateTime, setSelectedDateTime] = useAtom(selectedDateTimeAtom);
  const [selectedEmotions, setSelectedEmotions] = useAtom(selectedEmojisAtom);
  const [title, setTitle] = useAtom(retrospectTitleAtom);
  const [content, setContent] = useAtom(retrospectContentAtom);
  const [photoFile, setPhotoFile] = useAtom(retrospectPhotoAtom);
  const [postId, setPostId] = useState<number | null>(null);

  const writeMutation = useMutation({
    mutationFn: postWrite,
    onSuccess: (data) => {
      const createdPostId = data.success?.postId;

      if (!createdPostId) {
        alert('postId가 없습니다');
        return;
      }

      setPostId(createdPostId);
      setStep('confirm');
    },
    onError: () => {
      console.error('글 저장 실패');
      alert('저장에 실패했어요');
    },
  });

  const { mutate: mutateAnalyze, isLoading: isAnalyzing } = usePostAnalyze();

  const handleAnalyze = () => {
    if (!postId) {
      alert('postId가 없습니다. 먼저 저장해주세요.');
      return;
    }

    mutateAnalyze(postId, {
      onSuccess: (res) => {
        const analysis = res.resultType === 'SUCCESS' ? pickData(res) : undefined;

        setAnalysisResult(analysis?.signalNoiseResult ?? null);
        setEmotions(analysis?.emotions ?? []);
        setStep('analysis');
      },
      onError: () => {
        console.error('분석 실패');
        alert('분석 중 오류 발생');
      },
    });
  };

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    if (!selectedDateTime) {
      alert('날짜가 없습니다');
      return;
    }

    console.log('Sending file:', photoFile);

    writeMutation.mutate({
      date: selectedDateTime,
      title,
      content,
      emotions: selectedEmotions,
      photo: photoFile ?? null,
    });
  };
  const handleIsSignal = () => {
    setSelectedDateTime(null);
    setSelectedEmotions([]);
    setTitle('');
    setContent('');
    setPhotoFile(null);
    setPreviewImage(null);

    navigate('/');
  };

  return (
    <div className='min-h-screen flex justify-center items-center flex-col p-6 text-white'>
      <div className='flex flex-col w-full justify-center items-center gap-8'>
        <LayoutGroup>
          {step === 'write' ? (
            <motion.div layout>
              <RetrospectMainBlock editable image={previewImage} onChangeImage={setPreviewImage} />
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
                      transition={{ delay: 0.7, type: 'spring', stiffness: 70, damping: 18 }}
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
                        Your Analyzed <br />
                        Emotion
                      </h1>

                      {isAnalyzing ? ( // 분석 중 UI
                        <p className='text-lg text-white'>분석 중...</p>
                      ) : (
                        <EmotionAnalysisList emotions={emotions} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </LayoutGroup>
      </div>

      <div className='flex justify-center gap-8 mt-10 text-black'>
        {step === 'write' && (
          <>
            <Button
              type='button'
              className='px-6 py-2 w-[228px] rounded-full text-lg font-medium bg-gray-300 text-[#7C7979] mt-7'
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type='button'
              className='px-6 py-2 w-[228px] rounded-full text-lg font-medium mt-7'
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        )}
        {step === 'confirm' && (
          <Button
            type='button'
            className='w-[228px] py-2 rounded-full text-lg font-medium mt-7'
            onClick={handleAnalyze}
            disabled={isAnalyzing} // 분석 중 버튼 비활성화
          >
            {isAnalyzing ? '분석 중...' : 'Analyze'}
          </Button>
        )}
        {step === 'analysis' && analysisResult && (
          <div className='flex flex-col items-center justify-center'>
            <Button
              type='button'
              className={`w-[228px] py-2 rounded-full text-lg ${
                analysisResult === 'Signal' ? 'bg-[#FF6F4B]' : 'bg-[#FFB7A5]'
              }`}
              onClick={handleIsSignal}
            >
              {`It is ${analysisResult}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrospectFlowPage;
