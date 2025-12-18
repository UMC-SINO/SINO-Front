import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    if (data.name !== '누누누') {
      setError('name', {
        type: 'manual',
        message: '존재하지 않는 닉네임입니다.',
      });
      return;
    }

    console.log('로그인 성공', data);
  };

  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='absolute top-50 left-1/2 -translate-x-1/2 text-3xl font-medium tracking-wide'>
        Log In
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
              className='w-120 py-1.5 text-center font-semibold rounded-full bg-[#E1E0E0] text-xl text-gray-800 outline-none'
            />
          </div>

          {errors.name && (
            <p className='absolute text-sm text-[#FF8381] mt-28'>{errors.name.message}</p>
          )}
        </div>

        <Button
          type='submit'
          disabled={!isValid}
          className='absolute top-60 text-bgColor rounded-full w-48 py-2'
        >
          Get started
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
