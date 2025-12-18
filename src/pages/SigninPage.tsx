import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='absolute top-50 left-1/2 -translate-x-1/2 text-3xl font-medium tracking-wide'>
        Create an account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8'
      >
        <div className='w-full flex flex-col items-center gap-3'>
          <label className='text-xl tracking-wide'>Name</label>

          <div className='relative'>
            <input
              {...register('name')}
              type='text'
              placeholder='Enter your Username'
              autoComplete='off'
              className='w-120 py-2 text-center font-semibold rounded-full bg-[#E1E0E0] text-xl text-gray-800 outline-none'
            />

            <button
              type='submit'
              className='absolute left-full ml-3 top-1/2 -translate-y-1/2
                         text-xl text-bgColor font-semibold bg-[#FF6F4B]
                         hover:brightness-85 cursor-pointer py-2 rounded-full w-25'
            >
              Check
            </button>
          </div>

          {/* 에러 메시지 */}
          {errors.name ? (
            <p className='absolute text-sm text-[#FF8381] mt-28'>{errors.name.message}</p>
          ) : (
            <p className='absolute text-sm text-[#72DC70] mt-30'>사용 가능한 닉네임입니다.</p>
          )}
        </div>

        <Button
          type='submit'
          disabled={!isValid}
          className='absolute top-60 text-bgColor rounded-full w-48'
        >
          Get started
        </Button>
      </form>
    </div>
  );
};

export default SigninPage;
