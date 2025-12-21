import { useEffect, useMemo } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { useGetAnalysis } from '@/hooks/useGetAnalysis';
import { emojis } from '@/data/emoji';
import { pickData } from '@/types/common';

type EmotionItem = {
  emotion_name: string;
  percentage?: number;
};

export default function TurnToSignalModal() {
  const { activeModal, payload, openModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'turnToSignal';

  const postId = payload?.postId ?? 127;

  const { data: response } = useGetAnalysis(postId);

  const analysis = useMemo(() => {
    if (!isOpen) return undefined;
    if (!response) return undefined;
    return response?.resultType === 'SUCCESS' ? pickData(response) : undefined;
  }, [isOpen, response]);

  const topEmotionName = useMemo(() => {
    if (!isOpen) return undefined;

    const arr = (analysis?.emotions ?? []) as EmotionItem[];
    if (!arr.length) return undefined;

    const top = [...arr].sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))[0];
    return top?.emotion_name;
  }, [isOpen, analysis?.emotions]);

  const EmojiComp = useMemo(() => {
    const emojiData = emojis.find((e) => e.key === topEmotionName);
    return emojiData ? emojiData.Comp : emojis[0].Comp;
  }, [topEmotionName]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'>
      <div className='relative w-180 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-10 py-9 shadow-2xl'>
        <div className='flex justify-center'>
          <div className='flex h-24 w-24 items-center justify-center'>
            <EmojiComp />
          </div>
        </div>

        <div className='mt-5 text-center'>
          <h2 className='text-[20px] font-semibold text-white'>
            This is the current feeling of Noise
          </h2>
          <p className='mt-2 text-[13px] text-white/60'>Have your feelings changed?</p>
        </div>

        <div className='mt-8 flex justify-center gap-6'>
          <Button
            type='button'
            onClick={closeModal}
            className='w-40 h-13 bg-[#E1E0E0]! text-black! rounded-full hover:brightness-95!'
          >
            Back
          </Button>

          <Button
            type='button'
            onClick={() => openModal('emotion', { postId })}
            className='w-40 h-13 rounded-full'
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  );
}
