import type { UseSuspenseQueryResult } from '@tanstack/react-query';
import { type FC, useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Prefecture } from '../../domain/entity.ts';
import { useGetPopulationByPrefCodeSuspenseQuery } from '../../domain/hooks.ts';
import type { PopulationLabel } from '../../pages/PrefecturePage.tsx';
import styles from './PrefectureCharts.module.css';

export type Props = {
  dataKeys: string[];
  selectedPrefCodes: number[];
  getPrefectureListQuery: UseSuspenseQueryResult<Prefecture[], Error>;
  selectedPopulationLabel: PopulationLabel;
};

export const PrefectureCharts: FC<Props> = ({
  dataKeys,
  selectedPopulationLabel,
  getPrefectureListQuery,
  selectedPrefCodes,
}) => {
  const getPopulationByPrefCodeSuspenseQueries = useGetPopulationByPrefCodeSuspenseQuery(selectedPrefCodes, {
    enabled: !getPrefectureListQuery.isLoading,
  });
  const data = useMemo(() => {
    let populationsByYear: {
      [year: string]: {
        [prefName: string]: number;
      };
    } = {};
    for (const getPopulationByPrefCodeSuspenseQuery of getPopulationByPrefCodeSuspenseQueries) {
      const selectedPrefCode = selectedPrefCodes.find(
        (prefCode) => prefCode === getPopulationByPrefCodeSuspenseQuery.data.prefCode,
      );
      if (!selectedPrefCode) {
        continue;
      }
      const selectedPrefecture = getPrefectureListQuery.data.find(
        (prefecture) => prefecture.prefCode === selectedPrefCode,
      );
      if (!selectedPrefecture) {
        continue;
      }

      const targetPopulations = getPopulationByPrefCodeSuspenseQuery.data.result.data
        .filter(({ label }) => label === selectedPopulationLabel)
        .flatMap(({ data: populations }) => {
          return populations;
        });

      for (const targetPopulation of targetPopulations) {
        if (targetPopulation.year <= getPopulationByPrefCodeSuspenseQuery.data.result.boundaryYear) {
          const target =
            populationsByYear != null && populationsByYear[targetPopulation.year] != null
              ? {
                  ...populationsByYear[targetPopulation.year],
                  [selectedPrefecture.prefName]: targetPopulation.value,
                }
              : {
                  [selectedPrefecture.prefName]: targetPopulation.value,
                };

          populationsByYear = { ...populationsByYear, [targetPopulation.year]: target };
        }
      }
    }
    return Object.keys(populationsByYear)
      .map((key) => {
        return populationsByYear[key] != null
          ? {
              ...populationsByYear[key],
              year: Number(key),
            }
          : undefined;
      })
      .filter(Boolean) as { year: number; [key: string]: number }[];
  }, [getPopulationByPrefCodeSuspenseQueries, selectedPopulationLabel, getPrefectureListQuery, selectedPrefCodes]);

  return (
    <ResponsiveContainer width="50%" height="50%" aspect={1} className={styles.responsiveContainer}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {dataKeys.map((dataKey) => {
          return <Line type="monotone" dataKey={dataKey} stroke="#8884d8" key={dataKey} />;
        })}
        <CartesianGrid strokeDasharray="8,8" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
