import clsx from 'clsx';
import { emojis } from '@/data/emoji';
type DotIndicatorProps = {
  savedIds: string[];
  total?: number;
};

const DotIndicator = ({ savedIds, total = 5 }: DotIndicatorProps) => {
  return (
    <div className='flex items-center justify-center gap-4 pt-6'>
      {Array.from({ length: total }).map((_, i) => {
        const id = savedIds[i];
        const emoji = emojis.find((e) => e.key === id);

        return (
          <div
            key={i}
            className={clsx(
              'h-8 w-8 rounded-full flex items-center justify-center',
              emoji ? 'opacity-100' : 'opacity-30',
            )}
          >
            {emoji ? (
              <emoji.Comp className='h-6 w-6' />
            ) : (
              <span className='h-3 w-3 rounded-full bg-white/90' />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DotIndicator;
