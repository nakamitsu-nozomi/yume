import { useSuspenseQuery } from '@tanstack/react-query';
import { createPrefectureRepository } from './repository.ts';

const Keys = {
  getPrefectureList: ['getPrefectureList'] as const,
  // // 仮にPostsの1件を取得するクエリがあった場合
  // detail: (id: number) => [...postsKeys.all, id] as const,
};
const repository = createPrefectureRepository();
export const useGetPrefectureListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: Keys.getPrefectureList,
    queryFn: async () => await repository.getPrefectureList(),
    select: (res) => res.result,
  });
};
