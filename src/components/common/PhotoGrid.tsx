import { useRef, useState, useEffect, type ChangeEvent } from 'react';
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
};

export const PhotoGrid = ({ photos, readOnly = false }: PhotoGridProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 업로드/저장 전 로컬 미리보기용 임시 사진들
  const [previewPhotos, setPreviewPhotos] = useState<PhotoItem[]>([]);

  // 실제 렌더링은 "서버/부모 photos + 로컬 preview" 합쳐서 최대 4장
  const displayPhotos = [...photos, ...previewPhotos].slice(0, 4);
  const total = displayPhotos.length;

  // unmount 시 objectURL 정리
  useEffect(() => {
    return () => {
      previewPhotos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || readOnly || total >= 4) return;

    const url = URL.createObjectURL(file);
    const id = (globalThis.crypto?.randomUUID?.() ?? `preview-${Date.now()}`) as string;

    setPreviewPhotos((prev) => {
      // 최대 4장 제한 (현재 display 기준으로)
      const canAdd = 4 - photos.length - prev.length;
      if (canAdd <= 0) {
        URL.revokeObjectURL(url);
        return prev;
      }
      return [...prev, { id, url, isPick: false }];
    });

    // 기존 흐름 유지 (부모에서 업로드/저장 처리)

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

  //  프리뷰/실제 사진 구분해서 삭제 처리
  const handleRemove = (id: string) => {
    const isPreview = previewPhotos.some((p) => p.id === id);
    if (isPreview) {
      setPreviewPhotos((prev) => {
        const target = prev.find((p) => p.id === id);
        if (target) URL.revokeObjectURL(target.url);
        return prev.filter((p) => p.id !== id);
      });
      return;
    }
  };

  // 프리뷰도 Pick UI 동작은 되게(부모 반영은 기존대로)
  const handlePick = (id: string) => {
    const isPreview = previewPhotos.some((p) => p.id === id);
    if (isPreview) {
      setPreviewPhotos((prev) => prev.map((p) => ({ ...p, isPick: p.id === id })));
      // 부모가 id를 모를 수도 있으니 호출은 선택사항
      return;
    }
  };

  return (
    <div>
      <div className='text-sm text-white mb-2'>Picture</div>

      <div className='grid grid-cols-2 grid-rows-2 gap-3 w-full h-70'>
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={clsx('relative rounded-2xl overflow-hidden group', getPhotoPosClass(index))}
          >
            <img src={photo.url} alt='' className='w-full h-full object-cover' />

            {/* Pick 버튼 */}
            <button
              type='button'
              disabled={readOnly}
              onClick={() => !readOnly && handlePick(photo.id)}
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
                onClick={() => handleRemove(photo.id)}
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
