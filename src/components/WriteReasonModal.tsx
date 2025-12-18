import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

type Props = {
  open: boolean;
  onBack: () => void;
  onNext: (text: string) => void;
  onClose?: () => void;
  className?: string;
};

export default function WriteReasonModal({ open, onBack, onNext, onClose, className }: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) return;
    setValue('');
  }, [open]);

  if (!open) return null;

  const canNext = value.trim().length > 0;

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/55 backdrop-blur-[8px]' />

      {/* Modal Card */}
      <div
        className={clsx(
          'relative w-[820px] max-w-[92vw] rounded-[26px]',
          'bg-gradient-to-b from-[#2B2B2B] to-[#252525]',
          'px-16 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className='text-center'>
          <h2 className='text-white text-[24px] font-medium tracking-[-0.02em]'>
            It’s time to turn the <span className='text-[#FFB7A5]'>Signal</span>
          </h2>
          <p className='mt-5 text-white/45 text-[14px]'>ex. Have your feelings changed?</p>
        </div>

        {/* Input */}
        <div className='mt-10 flex justify-center'>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='텍스트 입력전'
            className={clsx(
              'w-[560px] max-w-[88vw] h-[140px]',
              'rounded-[18px] bg-white',
              'px-5 py-4 text-[14px] text-black',
              'placeholder:text-black/35 resize-none outline-none',
              'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]',
              'focus:shadow-[inset_0_0_0_2px_rgba(255,111,75,0.55)]',
            )}
          />
        </div>

        {/* Actions */}
        <div className='mt-10 flex justify-center gap-8'>
          <button
            type='button'
            onClick={onBack}
            className='w-[170px] h-[54px] rounded-full bg-[#E1E0E0] text-black font-semibold text-lg'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!canNext}
            onClick={() => onNext(value)}
            className={clsx('w-[170px] h-[54px] rounded-full text-lg')}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
