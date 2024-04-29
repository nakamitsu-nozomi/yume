import { type ChangeEvent, type FC, Suspense, useCallback, useState } from 'react';
import { PrefectureCharts, type Props } from '../components/PrefectureCharts';
import { PrefectureList } from '../components/PrefectureList';
import { useGetPrefectureListSuspenseQuery } from '../domain/hooks.ts';

export type PopulationLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export const PrefecturePage: FC<Props> = () => {
  const [checkboxStates, setCheckboxStates] = useState<{ [code: string]: boolean }>({});
  const getPrefectureListQuery = useGetPrefectureListSuspenseQuery();
  const selectedPrefCodes = Object.keys(checkboxStates).map((v) => Number(v));

  const dataKeys = getPrefectureListQuery.data
    .filter((prefecture) => selectedPrefCodes.includes(prefecture.prefCode))
    .map((v) => v.prefName);

  const handleChecked = useCallback(
    (e: ChangeEvent<HTMLInputElement>, prefCode: number) => {
      setCheckboxStates({ ...checkboxStates, [prefCode]: e.target.checked });
    },
    [checkboxStates],
  );

  const [selectedPopulationLabel, setSelectedPopulationLabel] = useState<PopulationLabel>('総人口');
  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPopulationLabel(e.target.value as PopulationLabel);
  }, []);

  return (
    <>
      <PrefectureList
        prefectures={getPrefectureListQuery.data ?? []}
        checkboxStates={checkboxStates}
        onChecked={handleChecked}
      />
      <select onChange={handleSelectChange} value={selectedPopulationLabel}>
        <option value="総人口">総人口</option>
        <option value="年少人口">年少人口</option>
        <option value="生産年齢人口">生産年齢人口</option>
        <option value="老年人口">老年人口</option>
      </select>
      <Suspense fallback={null}>
        <PrefectureCharts
          getPrefectureListQuery={getPrefectureListQuery}
          dataKeys={dataKeys}
          selectedPrefCodes={selectedPrefCodes}
          selectedPopulationLabel={selectedPopulationLabel}
        />
      </Suspense>
    </>
  );
};
