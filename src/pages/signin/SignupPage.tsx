import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';
import { useState } from 'react';
import NameInput from '@/components/signin/NameInput';

const SignupPage = () => {
  const [hasCheckedName, setHasCheckedName] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    console.log(data);
  };

  const handleCheckName = async () => {
    const isValid = await trigger('name');
    setHasCheckedName(true);
    setIsNameAvailable(isValid);
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
        <NameInput
          mode='signup'
          register={register}
          onCheckName={handleCheckName}
          error={errors.name}
          hasCheckedName={hasCheckedName}
        />

        <Button
          type='submit'
          disabled={!isNameAvailable}
          className='absolute top-60 text-bgColor rounded-full w-48 py-2'
        >
          Get started
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
