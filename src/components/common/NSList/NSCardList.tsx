// NSCardList.tsx
import type { NSCardType } from '@/types/NSCard';
import { NSCard } from './NSCard';

interface NSCardListProps {
  cards: NSCardType[];
}

export const NSCardList = ({ cards }: NSCardListProps) => (
  <div className='grid grid-cols-4 grid-rows-4 gap-0 w-[424px] h-[424px]'>
    {cards
      .filter(Boolean)
      .slice(0, 16)
      .map((card, idx) => (
        <NSCard
          key={idx}
          card={card!}
          onEdit={() => console.log('수정 페이지로 이동')}
          onDelete={() => console.log('카드 삭제 모달 열기')}
        />
      ))}
  </div>
);
