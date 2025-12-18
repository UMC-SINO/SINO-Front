import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

type Props = {
  open: boolean;
  title?: string; // "Success to change Signal"
  description?: string; // "Remeber only signal emotion of 2025"
  onOk: () => void; // 리스트로 복귀(부모에서 step 변경)
  onClose?: () => void; // ESC/배경 클릭 닫기(선택)
  className?: string;
  icon?: React.ReactNode; // 체크 아이콘 커스텀 가능
};

export default function SuccessChangeToSignalModal({
  open,
  title = 'Success to change Signal',
  description = 'Remeber only signal emotion of 2025',
  onOk,
  onClose,
  className,
  icon,
}: Props) {
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
      role='dialog'
      aria-modal='true'
    >
      {/* Backdrop */}
      <button
        type='button'
        aria-label='Close modal'
        onClick={() => onClose?.()}
        className='absolute inset-0 bg-black/55 backdrop-blur-[10px]'
      />

      {/* Card */}
      <div
        className={clsx(
          'relative w-[720px] max-w-[92vw]',
          'rounded-[32px] bg-[#2B2B2B]',
          'px-12 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className='flex justify-center'>
          <div className='h-[84px] w-[84px] flex items-center justify-center'>
            {icon ?? (
              // ✅ 기본 체크 아이콘(SVG)
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

        {/* Text */}
        <div className='mt-6 text-center'>
          <h2 className='text-white text-[18px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/45 text-[12px]'>{description}</p>
        </div>

        {/* Action */}
        <div className='mt-8 flex justify-center'>
          <Button
            type='button'
            onClick={onOk}
            className='h-[44px] w-[120px] rounded-full font-semibold'
          >
            Okey
          </Button>
        </div>
      </div>
    </div>
  );
}
