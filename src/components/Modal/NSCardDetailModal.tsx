import { Star, X } from 'lucide-react';
import EmotionAnalysisList from '../analysis/EmotionAnalysisList';
import clsx from 'clsx';
import { MemoCard } from '../common/MemoCard';
import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { useModalStore } from '@/stores/modalStore';
import { patchToggleBookmark } from '@/api/postApi';
import { isPostFail } from '@/types/post';
import type { NSDetail } from '@/types/emoji';

interface NSCardDetailModalProps {
  open: boolean;
  card?: NSDetail;
  isLoading: boolean;
  onClose: () => void;
}

const NSCardDetailModal = ({ open, card, isLoading, onClose }: NSCardDetailModalProps) => {
  const [localBookmarked, setLocalBookmarked] = useState(card?.book_mark);
  const [isToggling, setIsToggling] = useState(false);
  const openTurnToSignal = useModalStore((s) => s.openModal);

  useEffect(() => {
    setLocalBookmarked(card?.book_mark);
  }, [card?.id, card?.book_mark]);

  if (!open) return null;

  if (isLoading || !card) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
        <span className='text-white'>Loading...</span>
      </div>
    );
  }

  const isSignal = card.signal_noise === 'signal';

  const handleToggleBookmark = async () => {
    if (isToggling) return;

    const prev = localBookmarked;
    setLocalBookmarked(!prev);
    setIsToggling(true);

    try {
      const res = await patchToggleBookmark(card.id);
      if (isPostFail(res)) {
        setLocalBookmarked(prev);
        return;
      }
      setLocalBookmarked(res.success.book_mark);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='relative w-[900px] max-h-[70vh] bg-[#1E1E1E] rounded-3xl p-10 shadow-[0_0_25px_rgba(255,255,255,0.25),0_0_80px_rgba(255,255,255,0.12)] overflow-y-auto hide-scrollbar'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className='absolute top-6 right-6 text-gray-400 hover:text-white'>
          <X size={28} />
        </button>

        {/* Header */}
        <header className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <button onClick={handleToggleBookmark} disabled={isToggling}>
              <Star
                size={26}
                fill={localBookmarked ? 'currentColor' : 'none'}
                className={clsx(
                  'transition-colors',
                  localBookmarked ? 'text-[#FF6F4B]' : 'text-gray-500 hover:text-gray-300',
                )}
              />
            </button>

            <h2 className='text-2xl font-semibold text-white tracking-tight'>
              {isSignal ? 'My Signal' : 'My Noise'}
            </h2>
          </div>

          {!isSignal && (
            <Button
              type='button'
              className='bg-[#FF6F4B] text-black rounded-full px-5 py-2 text-sm'
              onClick={() => openTurnToSignal('turnToSignal')}
            >
              Turn to Signal
            </Button>
          )}
        </header>

        {/* Content */}
        <div className='grid grid-cols-2 gap-8 h-full'>
          {/* Left */}
          <section className='flex flex-col gap-6'>
            {/* Image */}
            <div className='flex flex-col gap-2'>
              <h5 className='text-sm font-medium text-white'>Image</h5>

              <div className='rounded-2xl overflow-hidden bg-[#2A2A2A] h-[280px]'>
                {card.photo_url ? (
                  <img
                    src={card.photo_url}
                    alt={card.title}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Emotion */}
            <div className='bg-[#252525] rounded-2xl p-5'>
              <h3 className='text-sm text-gray-400 mb-3'>Emotion Analysis</h3>
              <EmotionAnalysisList
                isLabel={false}
                emotions={card.aiAnalysis?.aiAnalyzedEmotion ?? []}
              />
            </div>
          </section>

          {/* Right */}
          <section className='flex flex-col h-full pb-8'>
            <MemoCard dateString={card.created_at} title={card.title} content={card.content} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NSCardDetailModal;
