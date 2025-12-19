import { Check as CheckIcon } from 'lucide-react';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
};

const Checkbox = ({ checked, onChange, label = 'save', className }: CheckboxProps) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${className ?? ''}`}>
      <span className='relative inline-flex h-5 w-5 items-center justify-center'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='absolute inset-0 top-1 h-5 w-5 appearance-none rounded border border-white/70 bg-transparent cursor-pointer'
        />

        {checked && (
          <CheckIcon
            size={14}
            strokeWidth={3}
            className='relative top-1 text-white pointer-events-none'
          />
        )}
      </span>

      <span className='pt-1 text-white text-sm font-pretendard'>{label}</span>
    </label>
  );
};

export default Checkbox;
