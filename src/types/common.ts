export type ApiFailResponse<TErrorData = unknown> = {
  resultType: 'FAIL';
  error: {
    errorCode: string;
    reason: string;
    data: TErrorData | null;
  };
  success: null | boolean;
};

// 유연하게 잡음~
export type ApiSuccessResponse<TData = unknown> = {
  resultType: 'SUCCESS';
  data?: TData;
  result?: TData;
  success?: boolean | null;
};

export type ApiResponse<TData = unknown, TErrorData = unknown> =
  | ApiSuccessResponse<TData>
  | ApiFailResponse<TErrorData>;

export const isFail = <TData, TErrorData>(
  res: ApiResponse<TData, TErrorData>,
): res is ApiFailResponse<TErrorData> => res.resultType === 'FAIL';

export const pickData = <TData>(res: ApiSuccessResponse<TData>) => {
  // 서버가 data 또는 result 둘 중 뭘 쓰든 여기서 흡수
  return (res.data ?? res.result) as TData | undefined;
};

export type CommonResponse<T> = {
  resultType: string;
  error: null | {
    errorCode: string;
    reason: string;
    data: null;
  };
  success: T;
};
