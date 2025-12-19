import { MemoCard } from '@/components/common/MemoCard';
import { PhotoGrid } from '@/components/common/PhotoGrid';
import { useRetrospectDraft } from '@/hooks/useRetrospectDraft';
import { RetrospectHeader } from '@/components/ui/RetrospectHeader';
import { ActionButtons } from '@/components/ui/ActionButton';
import { useNavigate } from 'react-router-dom';
import { EmotionChips, type EmotionOption } from '@/components/common/Emotionchips';
import { emojis } from '@/data/emoji';

export const RetrospectWritePage = () => {
  const draft = useRetrospectDraft('2025/12');
  const navigate = useNavigate();

  const EMOTION_OPTIONS: EmotionOption[] = emojis
    .filter((e) => ['Happy', 'Smile', 'Unrest', 'Sad', 'Worried'].includes(e.key))
    .map((e) => ({
      id: e.key,
      label: e.label,
      icon: <e.Comp />,
    }));

  const writeAction: 'continue' | 'save' = 'continue';

  const handleBack = () => {
    console.log('back');
  };

  const handlePrimary = () => {
    if (writeAction === 'continue') {
      navigate('/confirm');
    } else {
      draft.saveDraft();
    }
  };

  return (
    <div className='min-h-screen text-white flex flex-col items-center justify-center p-6'>
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

          <EmotionChips emotions={EMOTION_OPTIONS} />
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
  );
};

export default RetrospectWritePage;
