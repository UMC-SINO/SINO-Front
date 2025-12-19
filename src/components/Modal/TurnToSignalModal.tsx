import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { isEmotionSeletModalAtom, isTurnToSignalModalAtom } from '@/atoms';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  className?: string;
  icon: React.ReactNode;
};

export default function TurnToSignalModal({
  open,
  title = 'This is the current feeling of Noise',
  description = 'Have your feelings changed?',
  className,
  icon,
}: Props) {
  const setTurnOpen = useSetAtom(isTurnToSignalModalAtom);
  const setEmotionOpen = useSetAtom(isEmotionSeletModalAtom);

  const close = () => setTurnOpen(false);

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
      aria-modal='true'
      role='dialog'
    >
      <button
        type='button'
        aria-label='Close modal'
        onClick={close}
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      <div
        className={clsx(
          'relative w-180 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-10 py-9 shadow-2xl',
          className,
        )}
      >
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
            onClick={close}
            className='w-40 h-13 bg-[#E1E0E0]! text-black! rounded-full hover:brightness-95!'
          >
            Back
          </Button>

          <Button
            type='button'
            onClick={() => {
              setTurnOpen(false);
              setEmotionOpen(true);
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
