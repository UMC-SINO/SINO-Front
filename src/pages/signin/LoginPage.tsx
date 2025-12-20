import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';
import NameInput from '@/components/signin/NameInput';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';
import PageLoading from '@/components/common/PageLoading';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      navigate('/'); // 로그인 성공 후 이동
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    loginMutation.mutate({
      name: data.name,
    });
  };

  if (loginMutation.isPending) {
    return <PageLoading />;
  }

  return (
    <div className='relative min-h-screen text-white'>
      <h1 className='absolute top-50 left-1/2 -translate-x-1/2 text-3xl font-medium tracking-wide'>
        Log In
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8'
      >
        <NameInput mode='login' register={register} error={errors.name} />

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
