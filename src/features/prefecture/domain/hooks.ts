import { type UseQueryOptions, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import type { PopulationRequest, PopulationResponse, PopulationResult } from './entity.ts';
import { createPrefectureRepository } from './repository.ts';

const Keys = {
  getPrefectureList: ['getPrefectureList'] as const,
  getPopulationByPrefCode: (req: PopulationRequest) => ['getPopulationByPrefCode', req] as const,
};
const repository = createPrefectureRepository();
export const useGetPrefectureListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: Keys.getPrefectureList,
    queryFn: async () => await repository.getPrefectureList(),
    select: (res) => res.result,
  });
};

export const useGetPopulationByPrefCodeSuspenseQuery = (
  prefCodes: number[],
  options: Partial<
    UseQueryOptions<{
      prefCode: number;
      result: PopulationResult;
    }>
  >,
) => {
  // const queryFn = async (params :PopulationRequest) => await repository.getPopulationByPrefCode(params);
  const queries = prefCodes.map((prefCode) => ({
    queryFn: async () => await repository.getPopulationByPrefCode({ prefCode }),
    queryKey: Keys.getPopulationByPrefCode({ prefCode }),
    select: (res: PopulationResponse) => ({
      result: res.result,
      prefCode,
    }),
  }));
  return useSuspenseQueries({
    queries,
    ...options,
  });
};
