// 플로우 최종입니다

import type { EmotionOption } from '@/components/EmotionSelectModal';
import EmotionSelectModal from '@/components/EmotionSelectModal';
import WriteReasonModal from '@/components/WriteReasonModal';
import React, { useMemo, useState } from 'react';

import Happy from '@/assets/emojis/Happy.svg?react';
import Sad from '@/assets/emojis/Sad.svg?react';
import Angry from '@/assets/emojis/Angry.svg?react';
import Afraid from '@/assets/emojis/Afraid.svg?react';
import Boredom from '@/assets/emojis/Boredom.svg?react';
import Joyful from '@/assets/emojis/Joyful.svg?react';
import Shameful from '@/assets/emojis/Shameful.svg?react';
import Smile from '@/assets/emojis/Smile.svg?react';
import Unrest from '@/assets/emojis/Unrest.svg?react';
import Worried from '@/assets/emojis/Worried.svg?react';

import TurnToSignalModal from '@/components/TurnToSignalModal';
import SuccessChangeToSignalModal from '@/components/SuccessChangeToSignalModal';

type Step = 'view' | 'selectEmotion' | 'turnSignal' | 'success' | 'closed';

export default function NoiseReportFlow() {
  const [step, setStep] = useState<Step>('view');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [signalText, setSignalText] = useState<string>('');

  const options: EmotionOption[] = useMemo(
    () => [
      { id: 'happy', label: 'Happy', icon: <Happy /> },
      { id: 'joyful', label: 'Joyful', icon: <Joyful /> },
      { id: 'smile', label: 'Smile', icon: <Smile /> },
      { id: 'boredom', label: 'Bored', icon: <Boredom /> },
      { id: 'unrest', label: 'Unrest', icon: <Unrest /> },

      { id: 'sad', label: 'Sad', icon: <Sad /> },
      { id: 'worried', label: 'Worried', icon: <Worried /> },
      { id: 'afraid', label: 'Afraid', icon: <Afraid /> },
      { id: 'angry', label: 'Angry', icon: <Angry /> },
      { id: 'shameful', label: 'Shame', icon: <Shameful /> },
    ],
    [],
  );

  // ✅ id → icon 매핑
  const iconById = useMemo(() => {
    return options.reduce<Record<string, React.ReactNode>>((acc, cur) => {
      acc[cur.id] = cur.icon;
      return acc;
    }, {});
  }, [options]);

  // ✅ 대표 이모지: 첫 번째 선택값(없으면 기본)
  const primaryEmotionId = selectedEmotions[0] ?? 'happy';
  const primaryIcon = iconById[primaryEmotionId] ?? <Happy />;

  const toggleEmotion = (id: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const closeAll = () => setStep('closed');

  return (
    <>
      <TurnToSignalModal
        open={step === 'view'}
        onBack={closeAll}
        onChange={() => setStep('selectEmotion')}
        onClose={closeAll}
        icon={primaryIcon} // ✅ 선택한 대표 이모지를 첫 모달에 보여줌
      />

      <EmotionSelectModal
        open={step === 'selectEmotion'}
        options={options}
        selectedIds={selectedEmotions}
        maxSelect={5}
        onToggle={toggleEmotion}
        onBack={() => setStep('view')}
        onSignal={() => setStep('turnSignal')} // ✅ Signal → 다음 모달
        onClose={closeAll}
      />

      <WriteReasonModal
        open={step === 'turnSignal'}
        initialValue={signalText} // ✅ Back/재오픈에도 유지
        onBack={() => setStep('selectEmotion')}
        onNext={(text) => {
          // ✅ 여기서 값 저장
          setSignalText(text);

          // TODO: 필요하면 여기서 API 호출
          // await api.save({ emotions: selectedEmotions, text })

          // ✅ Next 누르면 성공 모달로 "이동"
          setStep('success');
        }}
        onClose={closeAll}
      />

      <SuccessChangeToSignalModal
        open={step === 'success'}
        onOk={() => {
          // ✅ OK 누르면 리스트로 돌아감 (모달 닫기)
          closeAll();

          // TODO(나중에): 여기서 리스트 재조회/상태 업데이트
          // refetchList();
        }}
        onClose={closeAll} // 모달 플로우 끝~!
      />
    </>
  );
}
