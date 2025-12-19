import { Check as CheckIcon } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
  error?: string | null;
  shakeKey?: number;
};

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100;
  const value2 = (15 + 36 * Math.random()) / 100;
  return {
    originX: value,
    originY: value2,
  };
};

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: 1,
      duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
};

const Checkbox = ({
  checked,
  onChange,
  label = 'save',
  className,
  error = null,
  shakeKey = 0,
}: CheckboxProps) => {
  const hasError = Boolean(error);

  return (
    <div className='flex items-center gap-3'>
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
            className={clsx(
              'absolute inset-0 top-1 h-5 w-5 appearance-none rounded bg-transparent cursor-pointer border',
              {
                'border-red-400': hasError,
                'border-white/70': !hasError,
              },
            )}
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
        className={`text-xs whitespace-nowrap transition-opacity ${
          hasError ? 'opacity-100 text-red-400' : 'opacity-0'
        }`}
      >
        {error ?? ' '}
      </span>
    </div>
  );
};

export default Checkbox;
