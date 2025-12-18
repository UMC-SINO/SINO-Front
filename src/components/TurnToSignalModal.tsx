// src / components / TurnToSignalModal.tsx;
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

type Props = {
  open: boolean;
  title?: string; // "This is the current feeling of Noise"
  description?: string; // "Have your feelings changed?"
  onBack: () => void;
  onChange: () => void;
  onClose?: () => void; // (선택) 배경 클릭/ESC 닫기
  className?: string;
  icon: React.ReactNode;
};

export default function TurnToSignalModal({
  open,
  title = 'This is the current feeling of Noise',
  description = 'Have your feelings changed?',
  onBack,
  onChange,
  onClose,
  className,
  icon,
}: Props) {
  // ESC로 닫기(선택)
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-[999] flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      {/* Backdrop (blur + dim) */}
      <button
        type='button'
        aria-label='Close modal'
        onClick={() => onClose?.()}
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      {/* Modal Card */}
      <div
        className={clsx(
          'relative w-[720px] max-w-[92vw] rounded-[24px] bg-[#2B2B2B] px-10 py-9 shadow-2xl',
          className,
        )}
      >
        {/* (선택) 우상단 닫기 X */}
        {onClose && (
          <button
            type='button'
            onClick={onClose}
            className='absolute right-5 top-5 text-white/60 hover:text-white/90'
            aria-label='Close'
          >
            ✕
          </button>
        )}

        {/* Icon */}
        <div className='flex justify-center'>
          <div className='h-[96px] w-[96px] flex items-center justify-center'>{icon}</div>
        </div>

        {/* Text */}
        <div className='mt-5 text-center'>
          <h2 className='text-white text-[20px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/60 text-[13px]'>{description}</p>
        </div>

        {/* Actions */}
        <div className='mt-8 flex justify-center gap-6'>
          {/* Back (회색) */}
          <Button
            type='button'
            onClick={onBack}
            className='w-[160px] h-[52px] rounded-full bg-[#E1E0E0] text-black hover:brightness-95'
          >
            Back
          </Button>

          {/* Change (주황) */}
          <Button type='button' onClick={onChange} className='w-[160px] h-[52px] rounded-full'>
            Change
          </Button>
        </div>
      </div>
    </div>
  );
}
