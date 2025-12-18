import { useState } from 'react';
import type { PhotoUpload } from '@/types/photo';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);

  // 사진 추가 (UI용: createObjectURL)
  const addPhoto = (file: File) => {
    if (photos.length >= 4) return;

    const newPhoto: PhotoUpload = {
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isThumbnail: photos.length === 0, // 첫 사진 자동 썸네일
      file, // 서버 연동 시 사용 예정
    };

    setPhotos((prev) => [...prev, newPhoto]);
  };

  // 사진 삭제
  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      const remaining = prev.filter((p) => p.id !== id);

      // 썸네일이 삭제되면 첫 번째 사진을 썸네일로 승계
      if (target?.isThumbnail && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isThumbnail: true };
      }

      return remaining;
    });
  };

  // 썸네일 지정
  const setThumbnail = (id: string) => {
    setPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        isThumbnail: photo.id === id,
      })),
    );
  };

  return {
    photos,
    addPhoto,
    removePhoto,
    setThumbnail,
  };
};
