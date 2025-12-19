/* eslint-disable no-unused-vars */
import { useRef, type ChangeEvent } from 'react';
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

  const showAddButton = !readOnly && total < 4;

  const getPhotoPosClass = (index: number) => {
    if (total === 1 && index === 0) return 'col-span-2';
    if (total === 2 && index === 0) return 'col-span-2';
    return '';
  };

  const getAddPosClass = () => {
    if (total === 0) return 'col-span-2 row-span-2';
    if (total === 1) return 'col-span-2';
    if (total === 2 || total === 3) return 'col-start-2 row-start-2';
    return '';
  };

  return (
    <div>
      <div className='text-sm text-white mb-2'>Picture</div>

      <div className='grid grid-cols-2 grid-rows-2 gap-3 w-full h-70'>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={clsx('relative rounded-2xl overflow-hidden group', getPhotoPosClass(index))}
          >
            <img src={photo.url} alt='' className='w-full h-full object-cover' />

            {/* Pick 버튼 */}
            <button
              type='button'
              disabled={readOnly}
              onClick={() => !readOnly && onPickPhoto?.(photo.id)}
              className={clsx(
                'absolute top-2 right-2 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100',
                photo.isPick
                  ? 'bg-[#FF8C6F] text-white'
                  : 'bg-white/20 text-white hover:bg-white hover:text-[#FF8C6F]',
                readOnly && 'hidden',
              )}
            >
              {photo.isPick && <Check size={12} />}
              Pick
            </button>

            {/* 삭제 버튼 */}
            {!readOnly && (
              <button
                type='button'
                onClick={() => onRemovePhoto?.(photo.id)}
                className='absolute top-2 left-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <Minus size={14} />
              </button>
            )}
          </div>
        ))}

        {showAddButton && (
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className={clsx(
              'rounded-2xl border border-dashed border-white',
              'flex flex-col items-center justify-center',
              'text-white hover:text-white/70 transition',
              getAddPosClass(),
            )}
          >
            <Camera size={18} />
            <span className='text-xs mt-1'>사진 추가</span>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </button>
        )}
      </div>
    </div>
  );
};
