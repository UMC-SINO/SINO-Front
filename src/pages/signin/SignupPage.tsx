import Button from '@/components/common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, type SigninFormData } from '@/schema/auth';
import { useEffect, useState } from 'react';
import NameInput from '@/components/signin/NameInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useCheckNickname } from '@/hooks/useCheckNickname';
import { useSignup } from '@/hooks/useSignup';
import { isFail } from '@/types/auth';

const getReason = (err: unknown) => {
  if (!axios.isAxiosError(err)) return '알 수 없는 오류';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = err.response?.data as any;
  return data?.error?.reason ?? '요청 처리 중 오류';
};

const SignupPage = () => {
  const [hasCheckedName, setHasCheckedName] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);

  const navigate = useNavigate();
  const checkNickname = useCheckNickname();
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  // 이름이 바뀌면 중복확인 상태 리셋
  const name = watch('name');
  useEffect(() => {
    setHasCheckedName(false);
    setIsNameAvailable(false);
  }, [name]);

  const handleCheckName = async () => {
    // 1) 프론트(스키마) 검증
    const isValid = await trigger('name');
    setHasCheckedName(true);

    if (!isValid) {
      setIsNameAvailable(false);
      return;
    }

    // 2) 서버 중복/유효성 검증
    const currentName = getValues('name');

    checkNickname.mutate(
      { name: currentName },
      {
        onSuccess: (res) => {
          if (isFail(res)) {
            setError('name', {
              type: 'manual',
              message: res.error.reason,
            });
            setIsNameAvailable(false);
            return;
          }

          setIsNameAvailable(true);
        },
        onError: (e) => {
          setError('name', {
            type: 'manual',
            message: getReason(e),
          });
          setIsNameAvailable(false);
        },
      },
    );
  };

  const onSubmit: SubmitHandler<SigninFormData> = (data) => {
    // 중복확인 통과 안 했으면 제출 막음
    if (!hasCheckedName || !isNameAvailable) return;

    signup.mutate(
      { name: data.name },
      {
        onSuccess: (res) => {
          if (isFail(res)) {
            setError('name', {
              type: 'manual',
              message: res.error.reason,
            });
            return;
          }
          navigate('/login');
        },
        onError: (e) => {
          setError('name', {
            type: 'manual',
            message: getReason(e),
          });
        },
      },
    );
  };

  const isLoading = checkNickname.isPending || signup.isPending;

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
          isNameAvailable={isNameAvailable}
        />

        <Button
          type='submit'
          disabled={!isNameAvailable || isLoading}
          className='absolute top-60 text-bgColor rounded-full w-48 py-2'
        >
          Get started
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
