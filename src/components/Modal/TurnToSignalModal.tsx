// !!! 중요 !!!
// 코드 제일 밑에 주석으로 모달 연결될 페이지 전달값들 적어놨습니다~

// src / components / TurnToSignalModal.tsx;
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button';

type Props = {
  open: boolean;
  title?: string; // "This is the current feeling of Noise"
  description?: string; // "Have your feelings changed?"
  onBack: () => void;
  onChange: () => void;
  onClose?: () => void; // (선택) 배경 클릭/ESC 닫기
  className?: string;
  icon: React.ReactNode;
};

export default function TurnToSignalModal({
  open,
  title = 'This is the current feeling of Noise',
  description = 'Have your feelings changed?',
  onBack,
  onChange,
  onClose,
  className,
  icon,
}: Props) {
  // ESC로 닫기(선택)
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      {/* Backdrop (blur + dim) */}
      <button
        type='button'
        aria-label='Close modal'
        onClick={() => onClose?.()}
        className='absolute inset-0 bg-black/50 backdrop-blur-[6px]'
      />

      {/* Modal Card */}
      <div
        className={clsx(
          'relative w-180 max-w-[92vw] rounded-3xl bg-[#2B2B2B] px-10 py-9 shadow-2xl',
          className,
        )}
      >
        {/* (선택) 우상단 닫기 X */}
        {onClose && (
          <button
            type='button'
            onClick={onClose}
            className='absolute right-5 top-5 text-white/60 hover:text-white/90'
            aria-label='Close'
          >
            ✕
          </button>
        )}

        {/* Icon */}
        <div className='flex justify-center'>
          <div className='h-24 w-24 flex items-center justify-center'>{icon}</div>
        </div>

        {/* Text */}
        <div className='mt-5 text-center'>
          <h2 className='text-white text-[20px] font-semibold'>{title}</h2>
          <p className='mt-2 text-white/60 text-[13px]'>{description}</p>
        </div>

        {/* Actions */}
        <div className='mt-8 flex justify-center gap-6'>
          {/* Back (회색) */}
          <Button // 요기 버튼 컴포넌트 variant="secondary" 개념 추가할지 나중에 고민!
            type='button'
            onClick={onBack}
            className='w-40 h-13 bg-[#E1E0E0]! text-black! rounded-full hover:brightness-95!'
          >
            Back
          </Button>

          {/* Change (주황) */}
          <Button type='button' onClick={onChange} className='w-40 h-13 rounded-full'>
            Change
          </Button>
        </div>
      </div>
    </div>
  );
}

// import type { EmotionOption } from '@/components/EmotionSelectModal';
// import EmotionSelectModal from '@/components/EmotionSelectModal';
// import WriteReasonModal from '@/components/WriteReasonModal';
// import React, { useMemo, useState } from 'react';
//
// import Happy from '@/assets/emojis/Happy.svg?react';
// import Sad from '@/assets/emojis/Sad.svg?react';
// import Angry from '@/assets/emojis/Angry.svg?react';
// import Afraid from '@/assets/emojis/Afraid.svg?react';
// import Boredom from '@/assets/emojis/Boredom.svg?react';
// import Joyful from '@/assets/emojis/Joyful.svg?react';
// import Shameful from '@/assets/emojis/Shameful.svg?react';
// import Smile from '@/assets/emojis/Smile.svg?react';
// import Unrest from '@/assets/emojis/Unrest.svg?react';
// import Worried from '@/assets/emojis/Worried.svg?react';
//
// import TurnToSignalModal from '@/components/TurnToSignalModal';
// import SuccessChangeToSignalModal from '@/components/SuccessChangeToSignalModal';
//
// type Step = 'view' | 'selectEmotion' | 'turnSignal' | 'success' | 'closed';
//
// export default function NoiseReportFlow() {
// const [step, setStep] = useState<Step>('view');
// const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
// const [signalText, setSignalText] = useState<string>('');
//
// const options: EmotionOption[] = useMemo(
// () => [
// { id: 'happy', label: 'Happy', icon: <Happy /> },
// { id: 'joyful', label: 'Joyful', icon: <Joyful /> },
// { id: 'smile', label: 'Smile', icon: <Smile /> },
// { id: 'boredom', label: 'Bored', icon: <Boredom /> },
// { id: 'unrest', label: 'Unrest', icon: <Unrest /> },
//
// { id: 'sad', label: 'Sad', icon: <Sad /> },
// { id: 'worried', label: 'Worried', icon: <Worried /> },
// { id: 'afraid', label: 'Afraid', icon: <Afraid /> },
// { id: 'angry', label: 'Angry', icon: <Angry /> },
// { id: 'shameful', label: 'Shame', icon: <Shameful /> },
// ],
// [],
// );
//
// ✅ id → icon 매핑
// const iconById = useMemo(() => {
// return options.reduce<Record<string, React.ReactNode>>((acc, cur) => {
// acc[cur.id] = cur.icon;
// return acc;
// }, {});
// }, [options]);
//
// ✅ 대표 이모지: 첫 번째 선택값(없으면 기본)
// const primaryEmotionId = selectedEmotions[0] ?? 'happy';
// const primaryIcon = iconById[primaryEmotionId] ?? <Happy />;
//
// const toggleEmotion = (id: string) => {
// setSelectedEmotions((prev) =>
// prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
// );
// };
//
// const closeAll = () => setStep('closed');
//
// return (
// <>
{
  /* <TurnToSignalModal */
}
// open={step === 'view'}
// onBack={closeAll}
// onChange={() => setStep('selectEmotion')}
// onClose={closeAll}
// icon={primaryIcon} // ✅ 선택한 대표 이모지를 첫 모달에 보여줌
// />
{
  /*  */
}
{
  /* <EmotionSelectModal */
}
// open={step === 'selectEmotion'}
// options={options}
// selectedIds={selectedEmotions}
// maxSelect={5}
// onToggle={toggleEmotion}
// onBack={() => setStep('view')}
// onSignal={() => setStep('turnSignal')} // ✅ Signal → 다음 모달
// onClose={closeAll}
// />
{
  /*  */
}
{
  /* <WriteReasonModal */
}
// open={step === 'turnSignal'}
// initialValue={signalText} // ✅ Back/재오픈에도 유지
// onBack={() => setStep('selectEmotion')}
// onNext={(text) => {
// ✅ 여기서 값 저장
// setSignalText(text);
//
// TODO: 필요하면 여기서 API 호출
// await api.save({ emotions: selectedEmotions, text })
//
// ✅ Next 누르면 성공 모달로 "이동"
// setStep('success');
// }}
// onClose={closeAll}
// />
{
  /*  */
}
{
  /* <SuccessChangeToSignalModal */
}
// open={step === 'success'}
// onOk={() => {
// ✅ OK 누르면 리스트로 돌아감 (모달 닫기)
// closeAll();
//
// TODO(나중에): 여기서 리스트 재조회/상태 업데이트
// refetchList();
// }}
// onClose={closeAll} // 모달 플로우 끝~!
// />
{
  /* </> */
}
// );
// }
//
