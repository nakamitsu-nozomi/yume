import { type ChangeEvent, type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { PrefectureCharts, type Props } from '../components/PrefectureCharts';
import { PrefectureList } from '../components/PrefectureList';
import { useGetPopulationByPrefCodeSuspenseQuery, useGetPrefectureListSuspenseQuery } from '../domain/hooks.ts';
import { type AggregatePrefecture, createAggregatePrefecture } from '../utils/prefecture.ts';

type PopulationCategory = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';
export const PrefecturePage: FC<Props> = () => {
  const [aggregatePrefectures, setAggregatePrefectures] = useState<AggregatePrefecture[]>([]);
  const getPrefectureListQuery = useGetPrefectureListSuspenseQuery();
  const getPopulationByPrefCodeSuspenseQueries = useGetPopulationByPrefCodeSuspenseQuery(
    aggregatePrefectures?.filter((aggregatePrefecture) => aggregatePrefecture.isChecked).map((v) => v.prefCode),
    {
      enabled: !getPrefectureListQuery.isLoading,
    },
  );
  const dataKeys = aggregatePrefectures
    .filter((aggregatePrefecture) => aggregatePrefecture.isChecked)
    .map((v) => v.prefName);

  useEffect(() => {
    if (getPrefectureListQuery.data != null) {
      setAggregatePrefectures(getPrefectureListQuery.data.map((prefecture) => createAggregatePrefecture(prefecture)));
    }
  }, [getPrefectureListQuery.data]);

  const handleChecked = useCallback(
    (e: ChangeEvent<HTMLInputElement>, prefCode: number) => {
      setAggregatePrefectures(
        aggregatePrefectures.map((aggregatePrefecture) => {
          if (aggregatePrefecture.prefCode === prefCode) {
            return {
              ...aggregatePrefecture,
              isChecked: e.target.checked,
            };
          }
          return aggregatePrefecture;
        }),
      );
    },
    [aggregatePrefectures],
  );

  const [selectedPopulationCategory, setSelectedPopulationCategory] = useState<PopulationCategory>('総人口');
  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPopulationCategory(e.target.value as PopulationCategory);
  }, []);

  const data = useMemo(() => {
    let result: {
      [year: string]: {
        [prefName: string]: number;
      };
    } = {};
    for (const getPopulationByPrefCodeSuspenseQuery of getPopulationByPrefCodeSuspenseQueries) {
      const selectedAggregatePrefecture = aggregatePrefectures.find(
        (aggregatePrefecture) => aggregatePrefecture.prefCode === getPopulationByPrefCodeSuspenseQuery.data.prefCode,
      );
      if (!selectedAggregatePrefecture) {
        continue;
      }
      const targetPopulations = getPopulationByPrefCodeSuspenseQuery.data.result.data
        .filter(({ label }) => label === selectedPopulationCategory)
        .flatMap(({ data: populations }) => {
          return populations;
        });

      for (const targetPopulation of targetPopulations) {
        if (targetPopulation.year <= getPopulationByPrefCodeSuspenseQuery.data.result.boundaryYear) {
          const target =
            result != null && result[targetPopulation.year] != null
              ? {
                  ...result[targetPopulation.year],
                  [selectedAggregatePrefecture.prefName]: targetPopulation.value,
                }
              : {
                  [selectedAggregatePrefecture.prefName]: targetPopulation.value,
                };

          result = { ...result, [targetPopulation.year]: target };
        }
      }
    }
    return Object.keys(result)
      .map((key) => {
        return result[key] != null
          ? {
              ...result[key],
              year: Number(key),
            }
          : undefined;
      })
      .filter(Boolean) as { year: number; [key: string]: number }[];
  }, [aggregatePrefectures, getPopulationByPrefCodeSuspenseQueries, selectedPopulationCategory]);

  return (
    <>
      <PrefectureList aggregatePrefectures={aggregatePrefectures} onChecked={handleChecked} />
      <select onChange={handleSelectChange} value={selectedPopulationCategory}>
        <option value="総人口">総人口</option>
        <option value="年少人口">年少人口</option>
        <option value="生産年齢人口">生産年齢人口</option>
        <option value="老年人口">老年人口</option>
      </select>
      <PrefectureCharts data={data} dataKeys={dataKeys} />
    </>
  );
};
