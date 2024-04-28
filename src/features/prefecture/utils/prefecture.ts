import type {Prefecture} from '../domain/entity.ts';

export type AggregatePrefecture = Prefecture & {
  isChecked: boolean;
};

export const createAggregatePrefecture = (prefecture: Prefecture, checked?: boolean): AggregatePrefecture => {
  return {
    ...prefecture,
    isChecked: checked ?? false,
  };
};
