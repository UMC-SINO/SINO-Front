import { Pencil, Trash2 } from 'lucide-react';
import type { NSCardType } from '@/types/NSCard';

interface NSCardProps {
  card: NSCardType;
  onEdit: () => void;
  onDelete?: () => void;
}

export const NSCard = ({ card, onEdit, onDelete }: NSCardProps) => {
  return (
    <div className='relative group w-full h-full rounded-lg overflow-hidden bg-black border border-white'>
      {card.image ? (
        <img src={card.image} alt={card.title} className='w-full h-full object-cover' />
      ) : (
        <div className='w-full h-full p-2 pt-6 text-xs text-gray-300'>
          <p className='leading-tight line-clamp-4'>{card.context}</p>
        </div>
      )}

      <div className='absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
        {onDelete && (
          <button onClick={onDelete} title='Delete' className='p-0.5 rounded'>
            <Trash2 size={14} className='text-gray-300' />
          </button>
        )}
        <button onClick={onEdit} title='Edit' className='p-0.5 rounded'>
          <Pencil size={14} className='text-gray-300' />
        </button>
      </div>
    </div>
  );
};
