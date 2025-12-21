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
  onCardUpdate?: (updated: NSCardType) => void;
}

export const NSCardList = ({ cards, title, onCardUpdate }: NSCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Year');
  const [selectedCard, setSelectedCard] = useState<NSCardType | null>(null);

  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const EmojiComp = emojis[0].Comp;

  const handleCardUpdate = (updated: NSCardType) => {
    // 1) 부모 리스트 반영
    onCardUpdate?.(updated);

    // 2) 상세 모달 카드 반영
    setSelectedCard((prev) => (prev && prev.id === updated.id ? updated : prev));
  };

  const openDeleteModal = (card: NSCardType) => {
    openModal('delete', { postId: card.id });
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

  return (
    <div className='flex flex-col'>
      {/* 헤더 */}
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-white text-3xl font-medium'>{title}</h1>

        <div className='flex items-center gap-2'>
          {isFilterOpen && (
            <div className='flex gap-2'>
              {['Year', 'Month', 'Bookmark'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter((prev) => (prev === filter ? null : filter))}
                  className={`px-3 py-1 rounded-full text-sm border transition
                    ${
                      activeFilter === filter
                        ? 'bg-white text-black border-white'
                        : 'text-white border-white/30 hover:bg-white/10'
                    }`}
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

      {selectedCard && (
        <NSCardDetailModal
          open
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
