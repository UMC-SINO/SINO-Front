import { Pencil, Trash2 } from 'lucide-react';
import type { NSCardType } from '@/types/NSCard';
import clsx from 'clsx';

interface NSCardProps {
  card: NSCardType;
  onEdit: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export const NSCard = ({ card, onEdit, onDelete, onClick }: NSCardProps) => {
  return (
    <div
      className={clsx(
        'relative group w-full h-full rounded-lg overflow-hidden bg-black cursor-pointer',
        !card.image ? 'border border-gray-200' : '',
      )}
      onClick={onClick}
    >
      {card.image ? (
        <img src={card.image} alt={card.title} className='w-full h-full object-cover' />
      ) : (
        <div className='w-full h-full p-1.5 pt-6 text-xs text-gray-300'>
          <p className='leading-tight line-clamp-3'>{card.context}</p>
        </div>
      )}

      <div className='absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title='Delete'
            className='p-0.5 rounded cursor-pointer'
          >
            <Trash2 size={14} className='text-gray-300' />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          title='Edit'
          className='p-0.5 rounded cursor-pointer'
        >
          <Pencil size={14} className='text-gray-300' />
        </button>
      </div>
    </div>
  );
};
