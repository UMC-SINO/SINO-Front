import { useEffect, useState } from 'react';
import type { NSCardType } from '@/types/NSCard';
import { NSCard } from './NSCard';
import { SlidersHorizontal } from 'lucide-react';
import NSCardDetailModal from '../Modal/NSCardDetailModal';

import TurnToSignalModal from '../Modal/TurnToSignalModal';
import EmotionSelectModal, { type EmotionOption } from '../Modal/EmotionSelectModal';
import SuccessChangeToSignalModal from '../Modal/SuccessChangeToSignalModal';
import DeleteConfirmModal from '../Modal/DeleteConfirmModal';
import WriteReasonModal from '../Modal/WriteReasonModal';

import { emojis } from '@/data/emoji';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  isDeleteModalOpenAtom,
  isEmotionSeletModalAtom,
  isSuccessModalAtom,
  isTurnToSignalModalAtom,
  isWriteReasonModalAtom,
} from '@/atoms';
import { useNavigate } from 'react-router-dom';

interface NSCardListProps {
  cards: NSCardType[];
  title: string;
}

const emotionOptions: EmotionOption[] = emojis.map((emoji) => ({
  id: emoji.key,
  label: emoji.label,
  icon: <emoji.Comp />,
}));

export const NSCardList = ({ cards, title }: NSCardListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>('Year');
  const [selectedCard, setSelectedCard] = useState<NSCardType | null>(null);
  const navigate = useNavigate();

  // open 값
  const isTurnOpen = useAtomValue(isTurnToSignalModalAtom);
  const isEmotionOpen = useAtomValue(isEmotionSeletModalAtom);
  const isWriteReasonOpen = useAtomValue(isWriteReasonModalAtom);
  const isSuccessOpen = useAtomValue(isSuccessModalAtom);
  const isDeleteOpen = useAtomValue(isDeleteModalOpenAtom);

  // setter
  const setDeleteOpen = useSetAtom(isDeleteModalOpenAtom);
  const setSuccessOpen = useSetAtom(isSuccessModalAtom);

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
        return card.bookmarked;
      default:
        return true;
    }
  });

  // 카드에서 삭제 눌렀을 때
  const openDeleteModal = () => {
    setSelectedCard(null);
    setDeleteOpen(true);
  };

  // Delete 모달이 열리면 Detail 무조건 닫기
  useEffect(() => {
    if (isDeleteOpen) {
      setSelectedCard(null);
    }
  }, [isDeleteOpen]);

  // Success 모달이 뜨면 Detail 닫기
  useEffect(() => {
    if (isSuccessOpen) {
      setSelectedCard(null);
    }
  }, [isSuccessOpen]);

  const closeSuccessModal = () => {
    setSuccessOpen(false);
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
      <div className='grid grid-cols-4 grid-rows-4 w-108 h-108 border rounded-lg border-white p-4 gap-4'>
        {filteredCards.slice(0, 16).map((card, idx) => (
          <NSCard
            key={idx}
            card={card}
            onEdit={() => navigate('/retro')}
            onDelete={openDeleteModal}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      {/* 1) Detail */}
      {selectedCard && (
        <NSCardDetailModal
          open={!!selectedCard}
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      <TurnToSignalModal open={isTurnOpen} icon={<EmojiComp className='w-full h-full' />} />
      <EmotionSelectModal open={isEmotionOpen} options={emotionOptions} />
      <WriteReasonModal open={isWriteReasonOpen} />
      <SuccessChangeToSignalModal open={isSuccessOpen} onClose={closeSuccessModal} />
      <DeleteConfirmModal open={isDeleteOpen} />
    </div>
  );
};
