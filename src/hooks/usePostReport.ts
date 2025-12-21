// hooks/useMonthlyReport.ts
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { ReportApiResponse } from '@/types/report';
import { postMonthlyReport } from '@/api/report';

type Variables = {
  year: number;
  month: number;
  userId: number;
};

export const usePostReport = (): {
  mutate: UseMutationResult<ReportApiResponse, Error, Variables, unknown>['mutate'];
  isLoading: boolean;
  data: ReportApiResponse | undefined;
  error: Error | null;
} => {
  const mutation = useMutation<ReportApiResponse, Error, Variables>({
    mutationFn: (variables) => postMonthlyReport(variables.year, variables.month, variables.userId),
  });
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
};
