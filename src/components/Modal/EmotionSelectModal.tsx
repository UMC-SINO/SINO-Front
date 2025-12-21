import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import Button from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { emojis } from '@/data/emoji';
import { patchPostEmotion } from '@/api/postEmotionApi';

import Check from '@/assets/emojis/Check.svg?react';

export default function EmotionSelectModal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { activeModal, payload, openModal, closeModal } = useModalStore();
  const isOpen = activeModal === 'emotion';

  const postId = payload?.postId ?? 127;

  const selectedEmotion = useMemo(() => {
    if (!isOpen) return null;
    if (checkedIndex === null) return null;
    return emojis[activeIndex].key;
  }, [isOpen, activeIndex, checkedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    setCheckedIndex(null);
    setIsSubmitting(false);
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedEmotion || isSubmitting) return;

    setIsSubmitting(true);
    await patchPostEmotion(postId, { emotion: [selectedEmotion] });
    openModal('writeReason');
    setIsSubmitting(false);
  };

  const total = emojis.length;
  const getOffset = (index: number) => {
    const raw = index - activeIndex;
    const half = Math.floor(total / 2);
    if (raw > half) return raw - total;
    if (raw < -half) return raw + total;
    return raw;
  };

  const isChecked = checkedIndex === activeIndex;

  // ✅ return null을 훅들 뒤로 이동
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs'>
      <div className='relative w-200 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-12 py-10 shadow-2xl'>
        <div className='relative flex h-80 w-full items-center justify-center overflow-hidden'>
          {emojis.map((emoji, index) => {
            const offset = getOffset(index);
            const Comp = emoji.Comp;
            const isCenter = offset === 0;
            const opacity = Math.max(0, 1 - Math.abs(offset) * 0.6);

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
                  if (isSubmitting) return;
                  setActiveIndex(index);
                  if (isCenter) setCheckedIndex((prev) => (prev === index ? null : index));
                }}
              >
                <div className='relative flex flex-col items-center'>
                  <Comp className='h-40 w-40' />

                  {isCenter && isChecked && (
                    <Check className='pointer-events-none absolute -right-8 -top-8 h-24 w-24' />
                  )}

                  {isCenter && <p className='mt-5 text-center text-white'>{emoji.label}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className='mt-7 text-center'>
          <h2 className='text-[18px] font-semibold text-white'>Please select an emotion</h2>
          <p className='mt-2 text-[12px] text-white/50'>You can select only one</p>
        </div>

        <div className='mt-8 flex justify-center gap-7'>
          <button
            type='button'
            onClick={() => openModal('turnToSignal', { postId })}
            disabled={isSubmitting}
            className='h-13 w-40 rounded-full bg-[#E1E0E0] text-lg font-semibold text-black hover:brightness-95'
          >
            Back
          </button>

          <Button
            type='button'
            disabled={!isChecked || isSubmitting}
            onClick={handleSubmit}
            className={clsx(
              'h-13 w-40 rounded-full text-lg font-semibold',
              !isChecked || isSubmitting
                ? 'cursor-not-allowed bg-[#6B6B6B] text-white/80'
                : 'bg-[#FF6F4B] text-black hover:brightness-90',
            )}
          >
            Signal
          </Button>
        </div>
      </div>
    </div>
  );
}
