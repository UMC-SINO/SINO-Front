import type { CommonResponse } from './common';

// 0) 공통 응답 래퍼 (Posts용)
export type PostApiErrorCode = 'P001' | 'P002' | 'P003' | 'P004';

/* ===============================
 * 1. Error Codes
 * =============================== */

export type PostErrorCode = 'P001' | 'P002' | 'P003' | 'P004';

/**
 * 예시
 * P001: 잘못된 postId 형식
 * P002: 존재하지 않는 게시글
 * P003: 권한 없음
 * P004: 기타 서버 오류
 */

/* ===============================
 * 2. 공통 API 응답 래퍼 (Post API 전용)
 * =============================== */

export type PostApiSuccess<TSuccess> = {
  resultType: 'SUCCESS';
  success: TSuccess;
  error: null;
};

export type PostApiFail<TErrorData = null> = {
  resultType: 'FAIL';
  success: null;
  error: {
    errorCode: PostErrorCode;
    reason: string;
    data: TErrorData;
  };
};

export type PostApiResponse<TSuccess, TErrorData = null> =
  | PostApiSuccess<TSuccess>
  | PostApiFail<TErrorData>;

/* ===============================
 * 3. 타입 가드
 * =============================== */

export const isPostFail = <TSuccess, TErrorData>(
  res: PostApiResponse<TSuccess, TErrorData>,
): res is PostApiFail<TErrorData> => res.resultType === 'FAIL';

/* ===============================
 * 4. 도메인 타입: Post
 * =============================== */

export type Post = {
  id: number;
  user_id: number;
  year: number;
  month: number;
  book_mark: boolean;
  title: string;
  content: string;
  heart: number;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string;
};

/* ===============================
 * 5. Delete Post
 * =============================== */

export type DeletedPost = {
  id: number;
  deleted_at: string;
};

export type DeletePostSuccess = {
  message: string;
  deletedPost: DeletedPost;
};

export type DeletePostResponse = PostApiResponse<DeletePostSuccess>;

/* ===============================
 * 6. Toggle Bookmark
 * =============================== */

/**
 * PATCH /api/posts/{postId}/bookmark
 */

export type ToggleBookmarkParams = {
  postId: number;
};

export type ToggleBookmarkSuccess = Post;

/**
 * 에러 data 예시
 * - P001: { postId: "abc" }
 * - P002: { postId: 999 }
 * - P003/P004: null
 */
export type ToggleBookmarkErrorData = { postId: string } | { postId: number } | null;

export type ToggleBookmarkResponse = PostApiResponse<
  ToggleBookmarkSuccess,
  ToggleBookmarkErrorData
>;

export type wirteResponse = CommonResponse<{
  postId: number;
  photo_url: string;
}>;
