import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchToggleBookmark } from '@/api/postApi';
import { postKeys } from '@/hooks/queryKeys';
import type { Post } from '@/types/post';

type Vars = { postId: number };
type PostsListCache = Post[];

function toggleInList(list: PostsListCache, postId: number) {
  return list.map((p) => (p.id === postId ? { ...p, bookmark: !p.book_mark } : p));
}

export function useToggleBookmark(params: { year?: number; month?: number; bookmark?: boolean }) {
  const qc = useQueryClient();
  const listKey = postKeys.list(params);

  return useMutation({
    mutationFn: ({ postId }: Vars) => patchToggleBookmark(postId),

    onMutate: async ({ postId }) => {
      await qc.cancelQueries({ queryKey: listKey });

      const prevList = qc.getQueryData<PostsListCache>(listKey);
      const prevDetail = qc.getQueryData<Post>(postKeys.detail(postId));

      // 리스트 낙관적 업데이트
      if (prevList) qc.setQueryData(listKey, toggleInList(prevList, postId));

      // 상세 낙관적 업데이트
      if (prevDetail)
        qc.setQueryData(postKeys.detail(postId), {
          ...prevDetail,
          bookmark: !prevDetail.book_mark,
        });

      return { prevList, prevDetail };
    },

    onError: (_err, { postId }, ctx) => {
      // 원복
      if (ctx?.prevList) qc.setQueryData(listKey, ctx.prevList);
      if (ctx?.prevDetail) qc.setQueryData(postKeys.detail(postId), ctx.prevDetail);
    },

    onSuccess: (res, { postId }) => {
      const updated = res.success; // Post

      // 리스트에서 해당 post 교체
      const list = qc.getQueryData<PostsListCache>(listKey);
      if (list)
        qc.setQueryData(
          listKey,
          list.map((p) => (p.id === postId ? updated : p)),
        );

      // 상세도 교체
      qc.setQueryData(postKeys.detail(postId), updated);
    },

    onSettled: (_res, _err, { postId }) => {
      // 최종적으로 현재 리스트를 invalidate 해서 재정렬/필터 반영 보장
      qc.invalidateQueries({ queryKey: listKey });
      qc.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
