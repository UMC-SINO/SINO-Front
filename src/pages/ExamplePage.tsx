import EmotionAnalysisList from '@/components/analysis/EmotionAnalysisList';

import { NSCardList } from '@/components/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/data/nscard';

const ExamplePage = () => {
  const signalBadges = [{ label: 'Year' }, { label: 'Month' }, { label: 'Bookmark' }];

  return (
    <main className='flex justify-center bg-black min-h-screen p-10'>
      <div className='flex gap-10'>
        <NSCardList cards={SIGNAL_CARDS} title='Signal' badges={signalBadges} />
        <NSCardList cards={NOISE_CARDS} title='Noise' />
      </div>
      <EmotionAnalysisList />
    </main>
  );
};

export default ExamplePage;
