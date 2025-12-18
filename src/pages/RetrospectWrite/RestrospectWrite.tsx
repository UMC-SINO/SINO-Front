import { useRetrospectDraft } from '@/hooks/useRetrospectDraft';
import { RetrospectHeader } from './RetrospectHeader';
import { PhotoGrid } from '@/components/common/PhotoGrid';
import { EmotionChips } from '@/components/common/Emotionchips';
import { MemoCard } from '@/components/common/MemoCard';
import { ActionButtons } from './ActionButton';

export const RetrospectWrite = () => {
  const PREV_DATA = {
    dateString: '2025/12',
    emotionList: ['🥰', '😀', '😰', '😉', '🥺'], // 가상 데이터, 수정 예정
  };

  const draft = useRetrospectDraft(PREV_DATA.dateString);

  // 지금은 첫 작성 진입
  // 나중에 "수정" 버튼으로 들어오면 'save'로 변경
  const writeAction: 'continue' | 'save' = 'continue';

  const handleBack = () => {
    console.log('back');
    // 이전 페이지 이동
  };

  const handlePrimary = () => {
    if (writeAction === 'continue') {
      console.log('continue → 다음 단계');
      // 다음 페이지로 이동 (추후 구현)
    } else {
      console.log('save → 수정 저장');
      draft.saveDraft();
    }
  };

  return (
    <div className='min-h-screen bg-[#111111] text-white flex items-center justify-center p-6'>
      <div className='w-full max-w-[920px]'>
        <div className='mb-8'>
          <RetrospectHeader dateString={draft.dateString} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'>
          <div className='flex flex-col gap-6'>
            <PhotoGrid
              photos={draft.photos}
              onAddPhoto={draft.addPhoto}
              onRemovePhoto={draft.removePhoto}
              onPickPhoto={draft.pickPhoto}
            />

            <EmotionChips emotions={PREV_DATA.emotionList} />
          </div>

          <MemoCard
            dateString={draft.dateString}
            title={draft.title}
            content={draft.content}
            onTitleChange={draft.setTitle}
            onContentChange={draft.setContent}
          />
        </div>

        <ActionButtons writeAction={writeAction} onBack={handleBack} onPrimary={handlePrimary} />
      </div>
    </div>
  );
};

export default RetrospectWrite;
