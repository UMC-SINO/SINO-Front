import { useState } from 'react';
import type { NSCardType } from '@/types/NSCard';
import { NSCard } from './NSCard';
import { SlidersHorizontal } from 'lucide-react';

interface NSCardListProps {
  cards: NSCardType[];
  title: string;
}

export const NSCardList = ({ cards, title }: NSCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Year');

  const handleBadgeClick = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const filteredCards = cards.filter((card) => {
    if (!activeFilter) return true;

    switch (activeFilter) {
      case 'Year':
        return card.date.startsWith('2025');
      case 'Month':
        return card.date.slice(5, 7) === '12';
      case 'Bookmark':
        return card.bookmarked;
      default:
        return true;
    }
  });

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-white text-3xl font-medium'>{title}</h1>

        <div className='flex items-center gap-2'>
          {isFilterOpen && (
            <div className='flex gap-2'>
              {['Year', 'Month', 'Bookmark'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleBadgeClick(filter)}
                  className={`
              px-3 py-1 rounded-full text-sm border transition
              ${
                activeFilter === filter
                  ? 'bg-white text-black border-white'
                  : 'text-white border-white/30 hover:bg-white/10'
              }
            `}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setIsFilterOpen((prev) => !prev)} className='text-white'>
            <SlidersHorizontal />
          </button>
        </div>
      </div>
      {/* 카드 리스트 */}
      <div className='grid grid-cols-4 grid-rows-4 w-108 h-108 border rounded-lg border-white p-4 gap-4'>
        {filteredCards.slice(0, 16).map((card, idx) => (
          <NSCard
            key={idx}
            card={card}
            onEdit={() => console.log('수정 페이지로 이동')}
            onDelete={() => console.log('카드 삭제 모달 열기')}
          />
        ))}
      </div>
    </div>
  );
};
