import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { isEmotionSeletModalAtom, isTurnToSignalModalAtom, isWriteReasonModalAtom } from '@/atoms';

export type EmotionOption = {
  id: string;
  label?: string;
  icon: React.ReactNode;
};

type Props = {
  open: boolean;
  options: EmotionOption[];
  maxSelect?: number;
  className?: string;
  title?: string;
  description?: string;
};

export default function EmotionSelectModal({
  open,
  options,
  maxSelect = 5,
  className,
  title = 'Please select an emotion',
  description = 'You can select up to 5',
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const setEmotionOpen = useSetAtom(isEmotionSeletModalAtom);
  const setTurnOpen = useSetAtom(isTurnToSignalModalAtom);
  const setWriteOpen = useSetAtom(isWriteReasonModalAtom);

  const close = () => setEmotionOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) setSelectedIds([]); // 열릴 때마다 초기화(원하면 제거)
  }, [open]);

  if (!open) return null;

  const canSignal = selectedIds.length > 0;

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const has = prev.includes(id);
      if (has) return prev.filter((x) => x !== id);
      if (prev.length >= maxSelect) return prev;
      return [...prev, id];
    });
  };

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
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      <div
        className={clsx(
          'relative w-190 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-12 py-10 shadow-2xl',
          className,
        )}
      >
        <div className='flex justify-center'>
          <div className='grid grid-cols-5 gap-x-7 gap-y-5'>
            {options.map((opt) => {
              const selected = selectedIds.includes(opt.id);
              const disabled = !selected && selectedIds.length >= maxSelect;

              return (
                <button
                  key={opt.id}
                  type='button'
                  onClick={() => {
                    if (disabled) return;
                    toggle(opt.id);
                  }}
                  aria-label={opt.label ?? opt.id}
                  className={clsx(
                    'h-11 w-11 flex items-center justify-center rounded-full transition',
                    selected ? 'ring-2 ring-[#FF6F4B] bg-white/5' : 'hover:bg-white/5',
                    disabled && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  <div className='h-8 w-8 [&>svg]:w-full [&>svg]:h-full'>{opt.icon}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className='mt-7 text-center'>
          <h2 className='text-white text-[18px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/50 text-[12px]'>
            {description}{' '}
            <span className='text-white/40'>
              ({selectedIds.length}/{maxSelect})
            </span>
          </p>
        </div>

        <div className='mt-8 flex justify-center gap-7'>
          <button
            type='button'
            onClick={() => {
              setEmotionOpen(false);
              setTurnOpen(true);
            }}
            className='w-40 h-13 rounded-full bg-[#E1E0E0] text-black font-semibold text-lg hover:brightness-95'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!canSignal}
            onClick={() => {
              setEmotionOpen(false);
              setWriteOpen(true);
            }}
            className={clsx(
              'w-40 h-13 rounded-full font-semibold text-lg',
              canSignal
                ? 'bg-[#FF6F4B] hover:brightness-90 text-black'
                : 'bg-[#6B6B6B] text-white/80 cursor-not-allowed',
            )}
          >
            Signal
          </Button>
        </div>
      </div>
    </div>
  );
}
