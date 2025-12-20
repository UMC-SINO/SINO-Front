// 닉네임(=name)만 받는 인증 모델
export type NicknameRequest = {
  name: string;
};

export type AuthErrorCode = 'U001' | 'U002' | 'U003';

export type ApiFailResponse<TErrorData = null> = {
  resultType: 'FAIL';
  error: {
    errorCode: AuthErrorCode;
    reason: string;
    data: TErrorData | null;
  };
  success: null;
};

// 유연하게 잡음~
export type ApiSuccessResponse<TData = null> = {
  resultType: 'SUCCESS';
  data?: TData;
  result?: TData;
  success?: true | null;
};

export type ApiResponse<TData = null, TErrorData = null> =
  | ApiSuccessResponse<TData>
  | ApiFailResponse<TErrorData>;

export const isFail = <TData, TErrorData>(
  res: ApiResponse<TData, TErrorData>,
): res is ApiFailResponse<TErrorData> => res.resultType === 'FAIL';
