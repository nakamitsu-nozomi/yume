export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PrefectureResponse {
  message: string;
  result: Prefecture[];
}

export interface Population {
  year: number;
  value: number;
}
export interface PopulationResult {
  boundaryYear: number;
  data: {
    label: string;
    data: Population[];
  }[];
}

export interface PopulationRequest {
  prefCode: number;
}
export interface PopulationResponse {
  message: string;
  result: PopulationResult;
}
