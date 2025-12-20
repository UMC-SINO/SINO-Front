/* eslint-disable no-unused-vars */

import React, { useRef, type ChangeEvent } from 'react';
import { Camera, X } from 'lucide-react';

type PhotoGridProps = {
  image: string | null;
  onChange: (image: string | null) => void;
  editable?: boolean;
};

export const PhotoGrid = ({ image, onChange, editable = true }: PhotoGridProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editable) return;

    const url = URL.createObjectURL(file);
    onChange(url);
    e.target.value = '';
  };

  const handleChangeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editable) return;
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (!editable) return;
    onChange(null);
  };

  // confirm / analysis + 이미지 없는 경우
  if (!editable && !image) return null;

  return (
    <div>
      <div className='text-sm text-white mb-2'>Picture</div>

      {image ? (
        /* 이미지 있을 때 */
        <div
          className='relative w-full h-70 rounded-2xl overflow-hidden cursor-pointer'
          onClick={handleChangeImage}
        >
          <img src={image} alt='preview' className='w-full h-full object-cover' />

          {editable && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className='absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5'
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        /* write 모드 + 이미지 없음 → 홀더 */
        editable && (
          <button
            type='button'
            onClick={handleChangeImage}
            className='w-full h-70 rounded-2xl border border-dashed border-white
                       flex flex-col items-center justify-center
                       text-white hover:text-white/70 transition'
          >
            <Camera size={18} />
            <span className='text-xs mt-1'>사진 추가</span>
          </button>
        )
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        hidden
        onClick={(e) => e.stopPropagation()}
        onChange={handleFileChange}
      />
    </div>
  );
};
