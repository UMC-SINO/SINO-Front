import { NSCardList } from '@/components/common/NSList/NSCardList';
import { NOISE_CARDS, SIGNAL_CARDS } from '@/data/nscard';

const CardListPage = () => {
  const signalBadges = [{ label: 'Year' }, { label: 'Month' }, { label: 'Bookmark' }];

  return (
    <div className='text-4xl min-h-dvh flex items-center justify-center font-semibold flex-row gap-10'>
      <NSCardList cards={SIGNAL_CARDS} title='Signal' badges={signalBadges} />
      <NSCardList cards={NOISE_CARDS} title='Noise' />
    </div>
  );
};

export default CardListPage;
