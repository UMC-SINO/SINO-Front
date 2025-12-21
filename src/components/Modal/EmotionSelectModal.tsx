import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { emojis } from '@/data/emoji';

import Check from '@/assets/emojis/Check.svg?react';

export default function EmotionSelectModal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const { activeModal, openModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'emotion';

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setCheckedIndex(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = emojis.length;

  const getOffset = (index: number) => {
    const raw = index - activeIndex;
    const half = Math.floor(total / 2);
    if (raw > half) return raw - total;
    if (raw < -half) return raw + total;
    return raw;
  };

  const isChecked = checkedIndex === activeIndex;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'
      role='dialog'
      aria-modal='true'
    >
      <div className='relative w-200 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-12 py-10 shadow-2xl'>
        {/* ===== Emoji Slide UI ===== */}
        <div className='relative flex justify-center items-center h-80 overflow-hidden w-full'>
          {emojis.map((emoji, index) => {
            const offset = getOffset(index);
            const Comp = emoji.Comp;
            const isCenter = offset === 0;

            const distance = Math.abs(offset);
            const opacity = Math.max(0, 1 - distance * 0.6);

            return (
              <motion.div
                key={emoji.key}
                animate={{
                  x: offset * 160,
                  scale: isCenter ? 1 : 0.65,
                  opacity,
                  zIndex: isCenter ? 10 : 5,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                className='absolute cursor-pointer'
                onClick={() => {
                  setActiveIndex(index);
                  if (isCenter) {
                    setCheckedIndex((prev) => (prev === index ? null : index));
                  }
                }}
              >
                <div className='relative flex flex-col items-center'>
                  <Comp className='w-40 h-40' />

                  {/* 체크 아이콘 */}
                  {isCenter && isChecked && (
                    <Check className='absolute -top-8 -right-8 w-24 h-24 pointer-events-none' />
                  )}

                  {isCenter && <p className='mt-5 text-center text-white'>{emoji.label}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== Text ===== */}
        <div className='mt-7 text-center'>
          <h2 className='text-white text-[18px] font-semibold'>Please select an emotion</h2>
          <p className='mt-2 text-white/50 text-[12px]'>You can select only one</p>
        </div>

        {/* ===== Actions ===== */}
        <div className='mt-8 flex justify-center gap-7'>
          <button
            type='button'
            onClick={() => openModal('turnToSignal')}
            className='w-40 h-13 rounded-full bg-[#E1E0E0] text-black font-semibold text-lg hover:brightness-95'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!isChecked}
            onClick={() => openModal('writeReason')}
            className={clsx(
              'w-40 h-13 rounded-full font-semibold text-lg',
              isChecked
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
