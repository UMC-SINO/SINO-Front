import { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { isDeleteModalOpenAtom } from '@/atoms';
import { useNavigate } from 'react-router-dom';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  className?: string;
};

export default function DeleteConfirmModal({
  open,
  title = 'Are you sure you want to ',
  description = 'Deleted posts cannot be recovered.',
  className,
}: Props) {
  const navigate = useNavigate();

  const setOpen = useSetAtom(isDeleteModalOpenAtom);
  const close = () => {
    navigate('/');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      role='dialog'
      aria-modal='true'
    >
      <button
        type='button'
        aria-label='Close modal'
        onClick={close}
        className='absolute inset-0 bg-black/40 backdrop-blur-[10px]'
      />

      <div
        className={clsx(
          'relative w-130 max-w-[92vw] rounded-4xl bg-[#2B2B2B] px-12 py-10',
          'shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center'>
          <p className='text-white text-[18px] font-semibold'>
            {title}
            <span className='text-[#FF6F4B]'>delete</span> it?
          </p>
          <p className='mt-2 text-white/45 text-[12px]'>{description}</p>
        </div>

        <div className='mt-8 flex justify-center gap-6'>
          <button
            type='button'
            onClick={close}
            className={clsx(
              'h-11 w-30 rounded-full border border-[#FF6F4B] text-[#FF6F4B] flex-1',
              'font-semibold hover:brightness-110 active:brightness-95',
            )}
          >
            Back
          </button>

          <Button
            type='button'
            onClick={() => {
              // TODO: 실제 삭제 처리
              close();
            }}
            className='h-11 w-30 rounded-full font-semibold flex-1'
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
