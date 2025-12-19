import { Star, X } from 'lucide-react';
import EmotionAnalysisList from '../analysis/EmotionAnalysisList';
import type { NSCardType } from '@/types/NSCard';
import clsx from 'clsx';
import { MemoCard } from '../common/MemoCard';
import { useState } from 'react';

interface NSCardDetailModalProps {
  isOpen: boolean;
  card: NSCardType;
  onClose: () => void;
}

export default function NSCardDetailModal({ isOpen, card, onClose }: NSCardDetailModalProps) {
  if (!isOpen) return null;
  const [bookmarked, setBookmarked] = useState(card.bookmarked);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='
        relative w-[830px] h-[562px] bg-bgColor rounded-4xl px-28 py-10
        border border-white/10 backdrop-blur-sm
        text-base flex-none'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-gray-400 hover:text-white transition-colors cursor-pointer'
        >
          <X size={32} />
        </button>

        {/* 헤더 */}
        <header className='flex items-center gap-2 mb-4'>
          <button
            type='button'
            onClick={() => setBookmarked((prev) => !prev)}
            aria-label='Toggle bookmark'
            className='transition-transform active:scale-95 cursor-pointer'
          >
            <Star
              size={33}
              fill={bookmarked ? 'currentColor' : 'none'}
              strokeWidth={bookmarked ? 0 : 2}
              className={clsx(bookmarked ? 'text-[#FF6F4B]' : 'text-gray-500 hover:text-gray-300')}
            />
          </button>
          <h2 className='text-3xl text-gray-100 font-medium tracking-tight'>
            {card.isSignal ? 'My Signal' : 'My Noise'}
          </h2>
        </header>

        {/* 컨텐츠 */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <section className='flex flex-col'>
            <span className='text-sm font-medium text-gray-400 mb-2'>Picture</span>
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
                <span className='text-gray-100 font-medium text-sm'>No Image</span>
              </div>
            )}
            <div className='mt-4'>
              <span className='text-sm font-medium text-gray-400'>Emotion</span>
              <div className='mt-2'>
                <EmotionAnalysisList isLabel={false} />
              </div>
            </div>
          </section>

          <section className='gap-2 font-medium h-[402px]'>
            <MemoCard dateString={card.date} title={card.title} content={card.context} />
          </section>
        </div>
      </div>
    </div>
  );
}
