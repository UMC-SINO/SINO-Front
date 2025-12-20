import React, { useEffect } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';

type Props = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

export default function SuccessChangeToSignalModal({
  title = 'Success to change Signal',
  description = 'Remember only signal emotion of 2025',
  icon,
}: Props) {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'success';

  // ESC 닫기
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
      role='dialog'
      aria-modal='true'
    >
      <button
        type='button'
        aria-label='Close modal'
        onClick={closeModal}
        className='absolute inset-0 bg-black/55 backdrop-blur-[10px]'
      />

      <div
        className='relative w-180 max-w-[92vw] rounded-4xl bg-[#2B2B2B] px-12 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-center'>
          <div className='h-21 w-21 flex items-center justify-center'>
            {icon ?? (
              <svg viewBox='0 0 24 24' className='h-full w-full' fill='none'>
                <path
                  d='M20 6L9 17l-5-5'
                  stroke='#7EE28B'
                  strokeWidth='2.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </div>
        </div>

        <div className='mt-6 text-center'>
          <h2 className='text-white text-[18px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/45 text-[12px]'>{description}</p>
        </div>

        <div className='mt-8 flex justify-center'>
          <Button
            type='button'
            onClick={closeModal}
            className='h-13 w-30 rounded-full font-semibold'
          >
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
}
