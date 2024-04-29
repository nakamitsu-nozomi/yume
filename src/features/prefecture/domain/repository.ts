import { apiClient } from '../../../api/apiClient.ts';
import { objectToUrlSearch } from '../../../utils/url.ts';
import type { PopulationRequest, PopulationResponse, PrefectureResponse } from './entity.ts';

export const createPrefectureRepository = () => ({
  async getPrefectureList() {
    const response = (await apiClient('/api/v1/prefectures')) as PrefectureResponse;
    return response;
  },
  async getPopulationByPrefCode(req: PopulationRequest): Promise<PopulationResponse> {
    const params = objectToUrlSearch(req);
    const response = await apiClient('/api/v1/population/composition/perYear', params);
    return response;
  },
});
