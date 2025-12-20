import React, { useEffect } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';

type Props = {
  title?: string;
  description?: string;
  icon: React.ReactNode;
};

export default function TurnToSignalModal({
  title = 'This is the current feeling of Noise',
  description = 'Have your feelings changed?',
  icon,
}: Props) {
  const { activeModal, openModal, closeModal } = useModalStore();

  const isOpen = activeModal === 'turnToSignal';

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
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      <button
        type='button'
        aria-label='Close modal'
        onClick={closeModal}
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      <div className='relative w-180 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-10 py-9 shadow-2xl'>
        <div className='flex justify-center'>
          <div className='h-24 w-24 flex items-center justify-center'>{icon}</div>
        </div>

        <div className='mt-5 text-center'>
          <h2 className='text-white text-[20px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/60 text-[13px]'>{description}</p>
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
