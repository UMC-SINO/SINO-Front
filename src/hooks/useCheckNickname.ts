import { postCheckNickname } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';

export function useCheckNickname() {
  return useMutation({
    mutationFn: postCheckNickname,
  });
}
