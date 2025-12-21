import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, type, className, disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'rounded-full flex items-center justify-center whitespace-nowrap w-45 py-2 text-xl font-semibold transition-all',
        disabled
          ? 'bg-[#E1E0E0] cursor-not-allowed text-gray-400'
          : 'bg-[#FF6F4B] hover:brightness-85 cursor-pointer',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
