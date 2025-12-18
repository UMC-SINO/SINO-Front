import type { EmotionOption } from '@/components/EmotionSelectModal';
import EmotionSelectModal from '@/components/EmotionSelectModal';
import FeelingModal from '@/components/TurnToSignalModal';
import WriteReasonModal from '@/components/WriteReasonModal';
import { useMemo, useState } from 'react';

import Happy from '@/assets/emojis/Happy.svg';
import Sad from '@/assets/emojis/Sad.svg';
import Angry from '@/assets/emojis/Angry.svg';
import Afraid from '@/assets/emojis/Afraid.svg';
import Boredom from '@/assets/emojis/Boredom.svg';
import Joyful from '@/assets/emojis/Joyful.svg';
import Shameful from '@/assets/emojis/Shameful.svg';
import Smile from '@/assets/emojis/Smile.svg';
import Unrest from '@/assets/emojis/Unrest.svg';
import Worried from '@/assets/emojis/Worried.svg';

type Step = 'view' | 'selectEmotion' | 'turnSignal' | 'closed';

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

  const toggleEmotion = (id: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const closeAll = () => setStep('closed');

  return (
    <>
      <FeelingModal
        open={step === 'view'}
        onBack={closeAll}
        onChange={() => setStep('selectEmotion')}
        onClose={closeAll}
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
        initialValue={signalText}
        onBack={() => setStep('selectEmotion')}
        onNext={(text) => {
          // ✅ 여기서 값 저장
          setSignalText(text);

          // TODO: 필요하면 여기서 API 호출
          // await api.save({ emotions: selectedEmotions, text })

          // ✅ Next 누르면 모달 닫기
          closeAll();
        }}
        onClose={closeAll}
      />
    </>
  );
}
