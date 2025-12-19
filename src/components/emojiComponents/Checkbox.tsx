import { Check as CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
  error?: string | null;
  shakeKey?: number;
};

const variants = {
  start: (i: number) => ({
    rotate: i % 2 === 0 ? [0, -6, 6, -6, 6, 0] : [0, 6, -6, 6, -6, 0],
    transition: { duration: 0.5 },
  }),
  reset: { rotate: 0 },
};

const Checkbox = ({
  checked,
  onChange,
  label = 'save',
  error = null,
  shakeKey = 0,
}: CheckboxProps) => {
  const hasError = Boolean(error);

  return (
    <div className='relative flex items-center'>
      <label className='flex items-center gap-3 cursor-pointer select-none'>
        <motion.span
          key={shakeKey}
          variants={variants}
          custom={0}
          animate={hasError ? 'start' : 'reset'}
          initial='reset'
          className='relative inline-flex h-5 w-5 items-center justify-center'
        >
          <input
            type='checkbox'
            checked={checked}
            onChange={onChange}
            className={
              'absolute inset-0 top-1 h-5 w-5 appearance-none rounded bg-transparent text-white/70 cursor-pointer border'
            }
          />

          {checked && (
            <CheckIcon
              size={14}
              strokeWidth={3}
              className='relative top-1 text-white pointer-events-none'
            />
          )}
        </motion.span>
        <span className='pt-1 text-white text-sm'>{label}</span>
      </label>

      <span
        className={clsx(
          'absolute left-full ml-5 top-1/2 top-4.5 -translate-y-1/2 text-xs whitespace-nowrap transition-opacity',
          hasError ? 'opacity-100 text-red-400' : 'opacity-0',
        )}
      >
        {error ?? ' '}
      </span>
    </div>
  );
};

export default Checkbox;
