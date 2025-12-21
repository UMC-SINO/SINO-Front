import { useEffect } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { useGetAnalysis } from '@/hooks/useGetAnalysis';
import { emojis } from '@/data/emoji';

export default function TurnToSignalModal() {
  const { activeModal, payload, openModal, closeModal } = useModalStore();

  const isOpen = activeModal === 'turnToSignal';

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  const postId = payload?.postId ?? 124;

  const { data: response, isLoading, isError } = useGetAnalysis(postId);

  if (!isOpen) return null; // 렌더링은 여전히 조건부

  const icon_name = response?.success?.emotions[0]?.emotion_name;

  const emojiData = emojis.find((e) => e.key === icon_name);

  const EmojiComp = emojiData ? emojiData.Comp : emojis[0].Comp;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'>
      <div className='relative w-180 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-10 py-9 shadow-2xl'>
        <div className='flex justify-center'>
          <div className='h-24 w-24 flex items-center justify-center'>
            <EmojiComp />
          </div>
        </div>

        <div className='mt-5 text-center'>
          <h2 className='text-white text-[20px] font-semibold'>
            This is the current feeling of Noise
          </h2>
          <p className='mt-2 text-white/60 text-[13px]'>Have your feelings changed?</p>
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
            onClick={() => {
              // TurnToSignal → EmotionSelect 로 전환
              openModal('emotion');
            }}
            className='w-40 h-13 rounded-full'
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  );
}
