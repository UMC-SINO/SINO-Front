import { authApi } from '@/api/authApi';
import type { NicknameRequest } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export function useCheckNickname() {
  return useMutation({
    mutationFn: (body: NicknameRequest) => authApi.checkNickname(body),
  });
}
