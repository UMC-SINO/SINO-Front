export const postKeys = {
  all: ['posts'] as const,
  list: (params: { year?: number; month?: number; book_mark?: boolean }) =>
    ['posts', 'list', params] as const,
  detail: (postId: number) => ['posts', 'detail', postId] as const,
};

// 리스트 캐시 구조를 Post[]라고 가정함!
