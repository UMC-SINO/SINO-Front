import { useState } from 'react';
import type { NSCardType } from '@/types/NSCard';
import { NSCard } from './NSCard';
import type { Badge } from '@/types/Badge';

interface NSCardListProps {
  cards: NSCardType[];
  title: string;
  badges?: Badge[];
}

export const NSCardList = ({ cards, title, badges = [] }: NSCardListProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleBadgeClick = (badge: Badge) => {
    setActiveFilter((prev) => (prev === badge.label ? null : badge.label));
  };

  const filteredCards = cards.filter((card) => {
    if (!activeFilter) return true;

    switch (activeFilter) {
      case 'Year':
        return card.date.startsWith('2025'); // 올해
      case 'Month':
        return card.date.slice(5, 7) === '12'; // 지금달
      case 'Bookmark':
        return card.bookmarked; // 북마크 했을 경우
      default:
        return true;
    }
  });

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-white text-2xl font-semibold'>{title}</h1>
        {badges.length > 0 && (
          <div className='flex gap-1'>
            {badges.map((badge, idx) => (
              <button
                key={idx}
                onClick={() => handleBadgeClick(badge)}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  activeFilter === badge.label
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {badge.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='grid grid-cols-4 grid-rows-4 w-[424px] h-[424px] box-border border rounded-lg border-white p-2 gap-2'>
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
