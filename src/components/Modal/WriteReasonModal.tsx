// src/components/Modal/WriteReasonModal.tsx
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { isWriteReasonModalAtom, isEmotionSeletModalAtom, isSuccessModalAtom } from '@/atoms';

type Props = {
  open: boolean;
  className?: string;
};

export default function WriteReasonModal({ open, className }: Props) {
  const [value, setValue] = useState('');

  const setWriteOpen = useSetAtom(isWriteReasonModalAtom);
  const setEmotionOpen = useSetAtom(isEmotionSeletModalAtom);
  const setSuccessOpen = useSetAtom(isSuccessModalAtom);

  const close = () => setWriteOpen(false);

  // 열릴 때 초기화
  useEffect(() => {
    if (!open) return;
    setValue('');
  }, [open]);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!open) return null;

  const canNext = value.trim().length > 0;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <button
        type='button'
        aria-label='Close modal'
        onClick={close}
        className='absolute inset-0 bg-black/55 backdrop-blur-sm'
      />

      {/* Modal Card */}
      <div
        className={clsx(
          'relative w-205 max-w-[92vw] rounded-[26px]',
          'bg-linear-to-b from-[#2B2B2B] to-[#252525]',
          'px-16 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center'>
          <h2 className='text-white text-[24px] font-medium tracking-[-0.02em]'>
            It’s time to turn the <span className='text-[#FFB7A5]'>Signal</span>
          </h2>
          <p className='mt-5 text-white/45 text-[14px]'>ex. Have your feelings changed?</p>
        </div>

        <div className='mt-10 flex justify-center'>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='텍스트 입력전'
            className={clsx(
              'w-140 max-w-[88vw] h-35',
              'rounded-[18px] bg-white',
              'px-5 py-4 text-[14px] text-black',
              'placeholder:text-black/35 resize-none outline-none',
              'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]',
              'focus:shadow-[inset_0_0_0_2px_rgba(255,111,75,0.55)]',
            )}
          />
        </div>

        <div className='mt-10 flex justify-center gap-8'>
          <button
            type='button'
            onClick={() => {
              setWriteOpen(false);
              setEmotionOpen(true); // ✅ back -> EmotionSelect
            }}
            className='w-42.5 h-13.5 rounded-full bg-[#E1E0E0] text-black font-semibold text-lg'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!canNext}
            onClick={() => {
              // TODO: 여기서 value 저장/전송 필요하면 나중에 atom or api 연결
              setWriteOpen(false);
              setSuccessOpen(true); // ✅ next -> Success
            }}
            className='w-42.5 h-13.5 rounded-full text-lg'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
