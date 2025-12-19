/* eslint-disable no-unused-vars */
import React, { useRef, type ChangeEvent } from 'react';
import { Camera, Minus, Check } from 'lucide-react';
import clsx from 'clsx';

type PhotoItem = {
  id: string;
  url: string;
  isPick: boolean;
};

type PhotoGridProps = {
  photos: PhotoItem[];
  readOnly?: boolean;
  onAddPhoto?: (file: File) => void;
  onRemovePhoto?: (id: string) => void;
  onPickPhoto?: (id: string) => void;
};

export const PhotoGrid = ({
  photos,
  readOnly = false,
  onAddPhoto,
  onRemovePhoto,
  onPickPhoto,
}: PhotoGridProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const total = photos.length;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || readOnly || total >= 4) return;
    onAddPhoto?.(file);
    e.target.value = '';
  };

  // 0개
  if (total === 0) {
    return (
      <GridWrapper>
        <AddSlot span='col-span-2 row-span-2' onClick={() => fileInputRef.current?.click()} />
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </GridWrapper>
    );
  }

  // 1개
  if (total === 1) {
    return (
      <GridWrapper>
        <PhotoSlot
          photo={photos[0]}
          span='col-span-2'
          readOnly={readOnly}
          onPick={() => onPickPhoto?.(photos[0].id)}
          onRemove={() => onRemovePhoto?.(photos[0].id)}
        />
        <AddSlot span='col-span-2' onClick={() => fileInputRef.current?.click()} />
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </GridWrapper>
    );
  }

  // 2개 이상
  return (
    <GridWrapper>
      {photos.slice(0, 4).map((photo) => (
        <PhotoSlot
          key={photo.id}
          photo={photo}
          readOnly={readOnly}
          onPick={() => onPickPhoto?.(photo.id)}
          onRemove={() => onRemovePhoto?.(photo.id)}
        />
      ))}

      {total < 4 && <AddSlot onClick={() => fileInputRef.current?.click()} />}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
    </GridWrapper>
  );
};

const GridWrapper = ({ children }: { children: React.ReactNode }) => (
  <div>
    <div className='text-sm text-white mb-2'>Picture</div>
    <div className='grid grid-cols-2 grid-rows-2 gap-3 w-65 h-65'>{children}</div>
  </div>
);

const PhotoSlot = ({
  photo,
  span,
  readOnly,
  onPick,
  onRemove,
}: {
  photo: PhotoItem;
  span?: string;
  readOnly?: boolean;
  onPick: () => void;
  onRemove: () => void;
}) => (
  <div className={clsx('relative rounded-2xl overflow-hidden group', span)}>
    <img src={photo.url} alt='' className='absolute inset-0 w-full h-full object-cover' />

    {!readOnly && (
      <>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            if (!photo.isPick) onPick();
          }}
          className={clsx(
            'absolute top-2 right-2 px-3 py-1 rounded-full',
            'text-[11px] font-semibold flex items-center gap-1',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            photo.isPick
              ? 'bg-[#FF8C6F] text-white'
              : 'bg-white/20 text-white hover:bg-white hover:text-[#FF8C6F]',
          )}
        >
          {photo.isPick && <Check size={12} />}
          Pick
        </button>

        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className='absolute top-2 left-2 bg-black/40 hover:bg-black/60
                     text-white rounded-full p-1.5
                     opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <Minus size={14} />
        </button>
      </>
    )}
  </div>
);

const AddSlot = ({ onClick, span }: { onClick: () => void; span?: string }) => (
  <button
    type='button'
    onClick={onClick}
    className={clsx(
      'rounded-2xl border border-dashed border-white',
      'flex flex-col items-center justify-center',
      'text-white hover:text-white/70 transition',
      span,
    )}
  >
    <Camera size={18} />
    <span className='text-xs mt-1'>사진 추가</span>
  </button>
);

export default PhotoGrid;
