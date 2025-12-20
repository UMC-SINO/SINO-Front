import { postSignup } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';

export function useSignup() {
  return useMutation({
    mutationFn: postSignup.signup,
  });
}
