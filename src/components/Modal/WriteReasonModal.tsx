// src/components/Modal/WriteReasonModal.tsx
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { usePostOneline } from '@/hooks/usePostOneline';

export default function WriteReasonModal({ onCloseDetail }: { onCloseDetail: () => void }) {
  const [value, setValue] = useState('');

  const { activeModal, payload, openModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'writeReason';

  const { mutate: saveOneline } = usePostOneline(() => {
    closeModal();
    openModal('success');
  });

  const postId = payload?.postId ?? 127;
  // 열릴 때 초기화
  useEffect(() => {
    if (isOpen) setValue('');
  }, [isOpen]);

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

  const canNext = value.trim().length > 0;

  return (
    <div
      onClick={closeModal}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'
    >
      {/* Modal Card */}
      <div
        className='relative w-205 max-w-[92vw] rounded-[26px] bg-linear-to-b from-[#2B2B2B] to-[#252525] px-16 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.55)]'
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
            className='w-140 max-w-[88vw] h-35 rounded-[18px] bg-white px-5 py-4 text-[14px] text-black placeholder:text-black/35 resize-none outline-none focus:shadow-[inset_0_0_0_2px_rgba(255,111,75,0.55)]'
          />
        </div>

        <div className='mt-10 flex justify-center gap-8'>
          <button
            type='button'
            onClick={() => openModal('emotion')}
            className='w-42.5 h-13.5 rounded-full bg-[#E1E0E0] text-black font-semibold text-lg'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!canNext}
            onClick={() => saveOneline({ postId: postId!, oneline: value })}
            className='w-42.5 h-13.5 rounded-full text-lg'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
