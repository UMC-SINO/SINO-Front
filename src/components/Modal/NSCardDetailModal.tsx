import { Star, X } from 'lucide-react';
import EmotionAnalysisList from '../analysis/EmotionAnalysisList';
import type { NSCardType } from '@/types/NSCard';
import clsx from 'clsx';
import { MemoCard } from '../common/MemoCard';
import { useState } from 'react';
import Button from '../common/Button';
import { useSetAtom } from 'jotai';
import { isTurnToSignalModalAtom } from '@/atoms';

interface NSCardDetailModalProps {
  open: boolean;
  card: NSCardType;
  onClose: () => void;
}

const NSCardDetailModal = ({ open, card, onClose }: NSCardDetailModalProps) => {
  const [bookmarked, setBookmarked] = useState(card.bookmarked);
  const setTurnOpen = useSetAtom(isTurnToSignalModalAtom);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='relative w-min-1/2 min-h-1/3 bg-[#1E1E1E] rounded-4xl px-28 py-10
       shadow-[0_0_25px_rgba(255,255,255,0.25),0_0_80px_rgba(255,255,255,0.12)]
       border border-white/10 
       backdrop-blur-sm text-base flex-none'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-gray-400 hover:text-white transition-colors cursor-pointer'
        >
          <X size={32} />
        </button>

        <header className='flex items-center gap-2 mb-4 justify-between'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setBookmarked((prev) => !prev)}
              aria-label='Toggle bookmark'
              className='transition-transform active:scale-95 cursor-pointer'
            >
              <Star
                size={28}
                fill={bookmarked ? 'currentColor' : 'none'}
                strokeWidth={bookmarked ? 0 : 2}
                className={clsx(
                  bookmarked ? 'text-[#FF6F4B]' : 'text-gray-500 hover:text-gray-300',
                )}
              />
            </button>

            <h2 className='text-3xl text-gray-100 font-medium tracking-tight'>
              {card.isSignal ? 'My Signal' : 'My Noise'}
            </h2>
          </div>

          {!card.isSignal && (
            <Button
              type='button'
              className='text-bgColor bg-[#FF6F4B] border rounded-full scale-[0.8]  origin-right'
              onClick={() => setTurnOpen(true)}
            >
              Turn to Signal
            </Button>
          )}
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <section className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-400 mb-2 block'>Picture</span>
              {card.image ? (
                <div className='w-[292px] h-[216px]'>
                  <img
                    src={card.image}
                    alt={card.title}
                    className='w-full h-full object-cover rounded-2xl'
                  />
                </div>
              ) : (
                <div className='w-[292px] h-[216px] bg-[#AFADAC] rounded-2xl flex items-center justify-center'>
                  <span className='text-gray-200 font-medium text-sm'>No Image</span>
                </div>
              )}
            </div>

            <div className='flex flex-col mt-auto'>
              <span className='text-sm font-medium text-gray-400 block mb-2 mt-4'>Emotion</span>
              <div className='w-[292px] scale-[0.98] origin-left ml-1 h-full'>
                <EmotionAnalysisList isLabel={false} className='h-full' />
              </div>
            </div>
          </section>

          <section className='flex flex-col h-full pb-8'>
            <MemoCard dateString={card.date} title={card.title} content={card.context} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NSCardDetailModal;
