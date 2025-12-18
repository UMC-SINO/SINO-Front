import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';

const yearItems = ['2021', '2022', '2023', '2024', '2025'];
const monthItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

import { NSCardList } from '@/components/common/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/constants/nscard';

const ExamplePage = () => {
  const signalBadges = [{ label: 'Year' }, { label: 'Month' }, { label: 'Bookmark' }];

  return (
    <main className='flex justify-center bg-black min-h-screen p-10'>
      <div className='flex gap-10'>
        <NSCardList cards={SIGNAL_CARDS} title='Signal' badges={signalBadges} />
        <NSCardList cards={NOISE_CARDS} title='Noise' />
      </div>
      <EmotionAnalysisList />
    </div>

    </main>

  );
};

export default ExamplePage;
