/* eslint-disable no-unused-vars */

import { motion } from 'framer-motion';
import { EmotionChips } from '@/components/common/Emotionchips';
import { MemoCard } from '@/components/common/MemoCard';
import { PhotoGrid } from '../common/PhotoGrid';
import { useRef, useState, type ChangeEvent } from 'react';
import { selectedDateTimeAtom, selectedEmojisAtom } from '@/atoms';
import { useAtomValue } from 'jotai';

type RetrospectMainBlockProps = {
  editable: boolean;
  image: string | null;
  onChangeImage: (image: string | null) => void;
};

export const RetrospectMainBlock = ({
  editable,
  image,
  onChangeImage,
}: RetrospectMainBlockProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const selectedDateTime = useAtomValue(selectedDateTimeAtom);
  const emotions = useAtomValue(selectedEmojisAtom);

  const dateString = selectedDateTime
    ? (() => {
        const [date] = selectedDateTime.split(' ');
        const [year, month] = date.split('-');
        return `${year}/${month}`;
      })()
    : '';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editable) return;

    const url = URL.createObjectURL(file);
    onChangeImage(url);
    e.target.value = '';
  };

  return (
    <motion.div
      layoutId='retrospect-block'
      layout
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className='grid grid-cols-1 md:grid-cols-2 gap-8 items-starts justify-center p-4 rounded-xl w-full max-w-2xl'
      style={{ willChange: 'transform' }}
    >
      <div className='flex flex-col gap-10'>
        <div
          className='h-70'
          onClick={() => {
            if (editable && !image) {
              fileInputRef.current?.click();
            }
          }}
        >
          <PhotoGrid image={image} onChange={onChangeImage} editable={editable} />
        </div>

        <input ref={fileInputRef} type='file' accept='image/*' hidden onChange={handleFileChange} />

        <EmotionChips emotions={emotions} />
      </div>

      <MemoCard
        dateString={dateString}
        title={title}
        content={content}
        readOnly={!editable}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />
    </motion.div>
  );
};
