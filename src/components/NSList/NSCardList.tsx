import { useState } from 'react';
import type { NSCardType } from '@/types/NSCard';
import { NSCard } from './NSCard';
import { SlidersHorizontal } from 'lucide-react';
import NSCardDetailModal from '../Modal/NSCardDetailModal';
import TurnToSignalModal from '../Modal/TurnToSignalModal';
import EmotionSelectModal from '../Modal/EmotionSelectModal';
import SuccessChangeToSignalModal from '../Modal/SuccessChangeToSignalModal';
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import WriteReasonModal from '../Modal/WriteReasonModal';
import { emojis } from '@/data/emoji';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';

interface NSCardListProps {
  cards: NSCardType[];
  title: string;
  // 북마크 토글 성공 시, 업데이트된 카드(혹은 id+book_mark)를 부모로 전달
  onCardUpdate?: (updated: NSCardType) => void;
}

export const NSCardList = ({ cards, title, onCardUpdate }: NSCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Year');
  const [selectedCard, setSelectedCard] = useState<NSCardType | null>(null);
  const navigate = useNavigate();

  const { openModal } = useModalStore();

  const EmojiComp = emojis[0].Comp;

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
        return card.book_mark;
      default:
        return true;
    }
  });

  const openDeleteModal = (card: NSCardType) => {
    openModal('delete', { postId: card.id });
    
  const handleCardUpdate = (updated: NSCardType) => {
    // 1) 부모 리스트 반영
    onCardUpdate?.(updated);

    // 2) 모달이 보고 있는 selectedCard도 반영
    setSelectedCard((prev) => (prev && prev.id === updated.id ? updated : prev));
  };

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
                    px-3 py-1 rounded-full text-sm border transition cursor-pointer
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
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className='text-white cursor-pointer'
          >
            <SlidersHorizontal />
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className='grid grid-cols-4 grid-rows-4 w-108 h-108 border rounded-2xl border-white p-4 gap-4'>
        {filteredCards.slice(0, 16).map((card) => (
          <NSCard
            key={card.id}
            card={card}
            onEdit={() => navigate('/retro')}
            onDelete={() => openDeleteModal(card)}
            onClick={() => {
              setSelectedCard(card);
              openModal('detail');
            }}
          />
        ))}
      </div>

      {/* 1) Detail */}
      {selectedCard && (
        <NSCardDetailModal
          open={!!selectedCard}
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdated={handleCardUpdate}
        />
      )}

      <TurnToSignalModal icon={<EmojiComp />} />
      <EmotionSelectModal />
      <WriteReasonModal onCloseDetail={() => setSelectedCard(null)} />
      <SuccessChangeToSignalModal />
      <DeleteConfirmModal />
    </div>
  );
};
