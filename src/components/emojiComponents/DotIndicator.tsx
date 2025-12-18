import clsx from 'clsx';

const DotIndicator = ({ total = 5, filled }: { total?: number; filled: number }) => {
  return (
    <div>
      {Array.from(
        { length: total }.map((_, i) => {
          const isFilled = i < filled;

          return <span key={i} className={} />;
        }),
      )}
    </div>
  );
};

export default DotIndicator;
