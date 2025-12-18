import { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

type Props = {
  open: boolean;
  title?: string; // "Are you sure you want to delete it?"
  description?: string; // "Deleted posts cannot be recovered."
  onBack: () => void; // 취소/닫기
  onDelete: () => void; // 삭제(지금은 UI만)
  onClose?: () => void; // 바깥 클릭/ESC 닫기
  className?: string;
};

export default function DeleteConfirmModal({
  open,
  title = 'Are you sure you want to ',
  description = 'Deleted posts cannot be recovered.',
  onBack,
  onDelete,
  onClose,
  className,
}: Props) {
  // ESC 닫기
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
          'relative w-[520px] max-w-[92vw]',
          'rounded-[32px] bg-[#2B2B2B]',
          'px-12 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className='text-center'>
          <p className='text-white text-[18px] font-semibold'>
            {title}
            <span className='text-[#FF6F4B]'>delete</span> it?
          </p>
          <p className='mt-2 text-white/45 text-[12px]'>{description}</p>
        </div>

        {/* Actions */}
        <div className='mt-8 flex justify-center gap-6'>
          {/* Back (outline) */}
          <button
            type='button'
            onClick={onBack}
            className={clsx(
              'h-[44px] w-[120px] rounded-full',
              'border border-[#FF6F4B] text-[#FF6F4B]',
              'font-semibold',
              'hover:brightness-110 active:brightness-95',
            )}
          >
            Back
          </button>

          {/* Delete (filled) */}
          <Button
            type='button'
            onClick={onDelete}
            className={clsx('h-[44px] w-[120px] rounded-full font-semibold')}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
