import { apiClient } from '../../../api/apiClient.ts';
import type { PrefectureResponse } from './entity.ts';

export const createPrefectureRepository = () => ({
  async getPrefectureList() {
    const response = (await apiClient('/api/v1/prefectures')) as PrefectureResponse;
    return response;
  },
});
