import { useState } from 'react';
import type { PhotoUpload } from '@/types/photo';

export const useRetrospectForm = () => {
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<string | null>(null);

  const handleAddPhoto = (file: File) => {
    if (photos.length >= 4) return;

    const newPhoto: PhotoUpload = {
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isThumbnail: photos.length === 0,
      file, // 서버 생기면 사용
    };

    setPhotos((prev) => [...prev, newPhoto]);
  };

  const handleRemovePhoto = (id: string) => {
    const filtered = photos.filter((p) => p.id !== id);
    if (!filtered.some((p) => p.isThumbnail) && filtered[0]) {
      filtered[0].isThumbnail = true;
    }
    setPhotos([...filtered]);
  };

  const handleSetThumbnail = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isThumbnail: p.id === id })));
  };

  const handleSave = () => {
    console.log('임시 저장 데이터:', {
      title,
      content,
      emotion,
      photos,
    });
    alert('UI 기준 임시 저장!');
  };

  return {
    photos,
    title,
    content,
    emotion,
    setTitle,
    setContent,
    setEmotion,
    handleAddPhoto,
    handleRemovePhoto,
    handleSetThumbnail,
    handleSave,
  };
};
