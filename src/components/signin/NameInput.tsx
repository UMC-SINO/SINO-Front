import { type FieldError, type UseFormRegister } from 'react-hook-form';
import { type SigninFormData } from '@/schema/auth';

interface NameInputProps {
  mode: 'signup' | 'login';
  register: UseFormRegister<SigninFormData>;
  onCheckName?: () => void;
  error?: FieldError;
  isNameAvailable?: boolean;
}

const NameInput = ({ mode, register, onCheckName, error, isNameAvailable }: NameInputProps) => {
  return (
    <div className='w-full flex flex-col items-center gap-3 relative'>
      <label className='text-xl tracking-wide'>Name</label>

      <div className='relative'>
        <input
          {...register('name')}
          type='text'
          placeholder='Enter your Username'
          autoComplete='off'
          className='w-120 py-1.5 text-center font-semibold rounded-full bg-[#E1E0E0] text-xl text-gray-800 outline-none'
        />

        {mode === 'signup' && (
          <button
            type='button'
            onClick={onCheckName}
            className='absolute left-full ml-3 top-1/2 -translate-y-1/2 text-xl text-bgColor font-semibold bg-[#FF6F4B] hover:brightness-85 cursor-pointer py-1.5 rounded-full w-25'
          >
            Check
          </button>
        )}
      </div>

      {mode === 'signup' && error && (
        <p className='absolute text-sm text-[#FF8381] mt-27'>{error.message}</p>
      )}

      {mode === 'signup' && isNameAvailable && !error && (
        <p className='absolute text-sm text-[#72DC70] mt-27'>사용 가능한 닉네임입니다.</p>
      )}

      {mode === 'login' && error && (
        <p className='absolute text-sm text-[#FF8381] mt-27'>{error.message}</p>
      )}
    </div>
  );
};

export default NameInput;
