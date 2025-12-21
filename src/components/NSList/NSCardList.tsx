import { useState } from 'react';
import type { NSItem } from '@/types/NSList';
import { NSCard } from './NSCard';
import { SlidersHorizontal } from 'lucide-react';
import NSCardDetailModal from '../Modal/NSCardDetailModal';
import TurnToSignalModal from '../Modal/TurnToSignalModal';
import EmotionSelectModal from '../Modal/EmotionSelectModal';
import SuccessChangeToSignalModal from '../Modal/SuccessChangeToSignalModal';
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import WriteReasonModal from '../Modal/WriteReasonModal';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/modalStore';
import { useNSDetail } from '@/hooks/useNSDetail';

interface NSCardListProps {
  cards: NSItem[];
  title: string;
}

export const NSCardList = ({ cards, title }: NSCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Year');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { openModal } = useModalStore();

  const { data: detailCard, isLoading } = useNSDetail(selectedPostId);

  const openDeleteModal = (card: NSItem) => {
    openModal('delete', { postId: card.id });
  };

  const filteredCards = cards.filter((card) => {
    if (!activeFilter) return true;

    switch (activeFilter) {
      case 'Year':
        return card.created_at.startsWith('2025');
      case 'Month':
        return card.created_at.slice(5, 7) === '12';
      case 'Bookmark':
        return card.book_mark;
      default:
        return true;
    }
  });

  return (
    <div className='flex flex-col'>
      {/* Header */}
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

      {/* Card Grid */}
      <div className='grid grid-cols-4 grid-rows-4 w-108 h-108 border rounded-2xl border-white p-4 gap-4'>
        {filteredCards.length === 0 ? (
          <div className='col-span-4 row-span-4 flex flex-col items-center justify-center text-white/60'>
            <p className='text-lg font-medium mb-2'>아직 작성된 {title}가 없어요</p>
            <p className='text-sm'>왼쪽 아래 Add 버튼을 눌러 추가해보세요</p>
          </div>
        ) : (
          filteredCards.slice(0, 16).map((card) => (
            <NSCard
              key={card.id}
              card={card}
              onEdit={() => navigate('/retro')}
              onDelete={() => openDeleteModal(card)}
              onClick={() => {
                setSelectedPostId(card.id);
                openModal('detail');
              }}
            />
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedPostId && (
        <NSCardDetailModal
          open
          card={detailCard}
          isLoading={isLoading}
          onClose={() => setSelectedPostId(null)}
        />
      )}

      <TurnToSignalModal />
      <EmotionSelectModal />
      <WriteReasonModal />
      <SuccessChangeToSignalModal />
      <DeleteConfirmModal />
    </div>
  );
};
