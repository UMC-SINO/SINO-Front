export type PostId = {
  postId: number;
};

export type PostErrorCode = 'P001' | 'P002' | 'P003';

export type ApiFail<TErrorData = null, TCode extends string = string> = {
  resultType: 'FAIL';
  error: {
    errorCode: TCode;
    reason: string;
    data: TErrorData;
  };
  success: null;
};

export type ApiSuccess<TSuccessData = null> = {
  resultType: 'SUCCESS';
  error: null;
  success: TSuccessData;
};

export type ApiResponse<TSuccessData = null, TErrorData = null, TCode extends string = string> =
  | ApiSuccess<TSuccessData>
  | ApiFail<TErrorData, TCode>;
