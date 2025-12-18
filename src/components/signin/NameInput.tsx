// components/auth/NameInput.tsx
import { type UseFormRegister, type FieldErrors, type UseFormTrigger } from 'react-hook-form';
import { useState } from 'react';
import { type SigninFormData } from '@/schema/auth';

type Mode = 'signup' | 'login';

interface Props {
  mode: Mode;
  register: UseFormRegister<SigninFormData>;
  errors: FieldErrors<SigninFormData>;
  trigger?: UseFormTrigger<SigninFormData>;
  // eslint-disable-next-line no-unused-vars
  onValidChange: (isValid: boolean) => void;
}

const EXISTING_NAME = '누누누';

const NameInput = ({ mode, register, errors, trigger, onValidChange }: Props) => {
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheckName = async () => {
    if (!trigger) return;
    const isValid = await trigger('name');
    setHasChecked(true);
    onValidChange(isValid);
  };

  const handleLoginChange = (value: string) => {
    setHasChecked(true);

    if (value.length < 3) {
      onValidChange(false);
      return;
    }

    if (value !== EXISTING_NAME) {
      onValidChange(false);
    } else {
      onValidChange(true);
    }
  };

  return (
    <div className='w-full flex flex-col items-center gap-3'>
      <label className='text-xl tracking-wide'>Name</label>

      <div className='relative'>
        <input
          {...register('name', {
            onChange: (e) => {
              if (mode === 'login') {
                handleLoginChange(e.target.value);
              }
            },
          })}
          type='text'
          autoComplete='off'
          placeholder='Enter your Username'
          className='w-120 py-1.5 text-center font-semibold rounded-full bg-[#E1E0E0] text-xl text-gray-800 outline-none'
        />

        {mode === 'signup' && (
          <button
            type='button'
            onClick={handleCheckName}
            className='absolute left-full ml-3 top-1/2 -translate-y-1/2
                       text-xl text-bgColor font-semibold bg-[#FF6F4B]
                       hover:brightness-85 py-1.5 rounded-full w-25'
          >
            Check
          </button>
        )}
      </div>

      {/* 메시지 */}
      {hasChecked &&
        (mode === 'signup' ? (
          errors.name ? (
            <p className='absolute text-sm text-[#FF8381] mt-28'>{errors.name.message}</p>
          ) : (
            <p className='absolute text-sm text-[#72DC70] mt-30'>사용 가능한 닉네임입니다.</p>
          )
        ) : (
          <p className='absolute text-sm text-[#FF8381] mt-28'>존재하지 않는 닉네임입니다.</p>
        ))}
    </div>
  );
};

export default NameInput;
