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

export type ApiSuccess = {
  resultType: 'SUCCESS';
  error: null;
  success: {
    message: string;
    deletedPost: {
      id: number;
      user_id: number;
      year: number;
      month: number;
      book_mark: boolean;
      title: string;
      content: string;
      heart: number;
      is_deleted: boolean;
      deleted_at: Date;
      created_at: Date;
    };
  };
};

export type ApiResponse<TErrorData = null, TCode extends string = string> =
  | ApiSuccess
  | ApiFail<TErrorData, TCode>;
