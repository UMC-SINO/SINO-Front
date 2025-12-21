import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';
import NameInput from '@/components/signin/NameInput';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';
import PageLoading from '@/components/common/PageLoading';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const userId = data?.success?.id;

      setLoggedIn(userId);
      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response?.status === 401) {
        const message = error.response.data?.error?.reason ?? '로그인에 실패했습니다.';

        setError('name', {
          type: 'server',
          message,
        });
      }
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
