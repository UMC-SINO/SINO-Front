export type PostErrorCode = 'P001' | 'P002' | 'P003' | 'P004';

export type ApiFail<TErrorData = null, TCode extends string = string> = {
  resultType: 'FAIL';
  error: {
    errorCode: TCode;
    reason: string;
    data: TErrorData;
  };
  success: null;
};

export type ApiSuccess<TSuccess> = {
  resultType: 'SUCCESS';
  error: null;
  success: TSuccess;
};

export type ApiResponse<TSuccess, TErrorData = null, TCode extends string = string> =
  | ApiSuccess<TSuccess>
  | ApiFail<TErrorData, TCode>;

export type DeletedPost = {
  id: number;
  user_id: number;
  year: number;
  month: number;
  book_mark: boolean;
  title: string;
  content: string;
  heart: number;
  is_deleted: boolean;
  deleted_at: string;
  created_at: string;
};

export type DeletePostSuccess = {
  message: string;
  deletedPost: DeletedPost;
};
