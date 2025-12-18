import { useMemo, useState } from 'react';
import type { PhotoItem } from '@/types/retrospect';

const makeId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export const useRetrospectDraft = (initialDateString: string) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dateString = useMemo(() => initialDateString, [initialDateString]);

  const addPhoto = (file: File) => {
    setPhotos((prev) => {
      if (prev.length >= 4) return prev;

      const next: PhotoItem = {
        id: makeId(),
        url: URL.createObjectURL(file),
        isPick: prev.length === 0,
        file,
      };

      return [...prev, next];
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      const remaining = prev.filter((p) => p.id !== id);

      if (target?.isPick && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isPick: true };
      }

      return remaining;
    });
  };

  const pickPhoto = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isPick: p.id === id })));
  };

  const saveDraft = () => {
    const payload = {
      dateString,
      photos: photos.map(({ id, url, isPick }) => ({ id, url, isPick })),
      emotion,
      title,
      content,
    };
    console.log('draft payload:', payload);
  };

  return {
    dateString,
    photos,
    emotion,
    title,
    content,
    setEmotion,
    setTitle,
    setContent,
    addPhoto,
    removePhoto,
    pickPhoto,
    saveDraft,
  };
};
