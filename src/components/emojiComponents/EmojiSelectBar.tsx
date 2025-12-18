import type { ChangeEvent } from 'react';

type EmojiSelectBarProps = {
  value: number;
  max: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
  disabled?: boolean;
};

const EmojiSelectBar = ({ value, max, onChange, disabled }: EmojiSelectBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div>
      <input
        type='range'
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className='slider w-60'
      />
    </div>
  );
};

export default EmojiSelectBar;
