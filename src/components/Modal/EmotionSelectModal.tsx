// src / components / EmotionSelectModal.tsx;
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

export type EmotionOption = {
  id: string; // 예: "happy", "sad"
  label?: string; // 접근성/툴팁용
  icon: React.ReactNode; // SVG 컴포넌트 or 이모지
};

type Props = {
  open: boolean;
  options: EmotionOption[];
  selectedIds: string[];
  maxSelect?: number; // 기본 5
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onToggle: (id: string) => void;
  onSignal: () => void;
  onClose?: () => void;
  className?: string;
  title?: string; // "Please select an emotion"
  description?: string; // "You can select up to 5"
};

export default function EmotionSelectModal({
  open,
  options,
  selectedIds,
  maxSelect = 5,
  onBack,
  onToggle,
  onSignal,
  onClose,
  className,
  title = 'Please select an emotion',
  description = 'You can select up to 5',
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

  const canSignal = selectedIds.length > 0;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      role='dialog'
      aria-modal='true'
    >
      {/* Backdrop */}
      <button
        type='button'
        aria-label='Close modal'
        onClick={() => onClose?.()}
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      {/* Card */}
      <div
        className={clsx(
          'relative w-190 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-12 py-10 shadow-2xl',
          className,
        )}
      >
        {/* (선택) 닫기 */}
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

        {/* Emoji Grid */}
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
                    onToggle(opt.id);
                  }}
                  aria-label={opt.label ?? opt.id}
                  className={clsx(
                    'h-11 w-11 flex items-center justify-center rounded-full transition',
                    selected ? 'ring-2 ring-[#FF6F4B] bg-white/5' : 'hover:bg-white/5',
                    disabled && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  {/* 아이콘은 SVG/이모지 뭐든 가능 */}
                  <div className='h-8 w-8 [&>svg]:w-full [&>svg]:h-full'>{opt.icon}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text */}
        <div className='mt-7 text-center'>
          <h2 className='text-white text-[18px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/50 text-[12px]'>
            {description}{' '}
            <span className='text-white/40'>
              ({selectedIds.length}/{maxSelect})
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className='mt-8 flex justify-center gap-7'>
          {/* Back (회색) */}
          <button
            type='button'
            onClick={onBack}
            className='w-40 h-13 rounded-full bg-[#E1E0E0] text-black font-semibold text-lg hover:brightness-95'
          >
            Back
          </button>

          {/* Signal (선택 전엔 비활성 회색, 선택하면 활성) */}
          <Button
            type='button'
            disabled={!canSignal}
            onClick={onSignal}
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
