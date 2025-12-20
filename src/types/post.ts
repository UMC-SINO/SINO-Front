// 0) 공통 응답 래퍼 (Posts용)
export type PostApiErrorCode = 'P001' | 'P002' | 'P003' | 'P004';

export type PostApiFailResponse<TErrorData = unknown> = {
  resultType: 'FAIL';
  error: {
    errorCode: PostApiErrorCode;
    reason: string;
    data: TErrorData | null;
  };
  success: null;
};

export type PostApiSuccessResponse<TSuccessData = unknown> = {
  resultType: 'SUCCESS';
  error: null;
  success: TSuccessData;
};

export type PostApiResponse<TSuccessData = unknown, TErrorData = unknown> =
  | PostApiSuccessResponse<TSuccessData>
  | PostApiFailResponse<TErrorData>;

export const isPostFail = <TSuccess, TError>(
  res: PostApiResponse<TSuccess, TError>,
): res is PostApiFailResponse<TError> => res.resultType === 'FAIL';

// 1) 도메인 타입: Post
export type Post = {
  id: number;
  user_id: number;
  year: number;
  month: number;
  bookmark: boolean;
  title: string;
  content: string;
  heart: number;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string; // ISO string
};

// 2) API별 타입

// PATCH /api/posts/{postId}/bookmark  (북마크 토글)
// - body 없음
// - 성공 시 success에 Post 객체 반환 (스웨거 예시)
export type ToggleBookmarkParams = {
  postId: number;
};

export type ToggleBookmarkSuccess = Post;

// 에러 data 예시:
// P001: { postId: "abc" } (문자열)
// P002: { postId: 999 } (숫자)
// P003: null
export type ToggleBookmarkErrorData =
  | { postId: string } // invalid id format
  | { postId: number } // not found
  | null;

export type ToggleBookmarkResponse = PostApiResponse<
  ToggleBookmarkSuccess,
  ToggleBookmarkErrorData
>;

/** DELETE /api/posts/{postId} (소프트 삭제)
 *  성공 예시:
 *  success: {
 *    message: "Post with ID 1 deleted.",
 *    deletedPost: { ...Post, is_deleted:true ... }
 *  }
 */
export type DeletePostParams = {
  postId: number;
};

export type DeletePostSuccess = {
  message: string;
  deletedPost: Post;
};

// 에러: (스웨거에 P001, P002, P003 그리고 P004 언급)
// - P001: { postId: "abc" }
// - P002: { postId: 999 }
// - P003: null
// - P004: (이미 삭제된 게시글 등) data가 있을 수도/없을 수도 → 일단 유연하게
export type DeletePostErrorData = { postId: string } | { postId: number } | null;

export type DeletePostResponse = PostApiResponse<DeletePostSuccess, DeletePostErrorData>;
