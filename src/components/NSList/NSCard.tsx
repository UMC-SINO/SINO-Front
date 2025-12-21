import { Pencil, Trash2 } from 'lucide-react';
import type { NSItem } from '@/types/NSList';
import clsx from 'clsx';

interface NSCardProps {
  card: NSItem;
  onEdit: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export const NSCard = ({ card, onEdit, onDelete, onClick }: NSCardProps) => {
  return (
    <div
      className={clsx(
        'relative group w-full h-full rounded-lg overflow-hidden bg-black cursor-pointer',
        !card.photo_url && 'border border-gray-200',
      )}
      onClick={onClick}
    >
      {card.photo_url ? (
        <img src={card.photo_url} alt={card.title} className='w-full h-full object-cover' />
      ) : (
        <div className='w-full h-full p-1.5 pt-6 text-xs text-gray-300'>
          <p className='leading-tight line-clamp-3'>{card.content}</p>
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
            className='p-0.5 rounded cursor-pointer disabled:opacity-50'
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
