import { type ChangeEvent, type FC, Suspense, useCallback, useEffect, useState } from 'react';
import { CheckBox } from '../../../../ui/Checkbox';
import { useGetPrefectureListSuspenseQuery } from '../../domain/hooks.ts';
import { type AggregatePrefecture, createAggregatePrefecture } from '../../utils/prefecture.ts';
import styles from './PrefectureList.module.css';

interface Props {
  onChecked: (prefecture: AggregatePrefecture) => void;
}

export const PrefectureList: FC<Props> = ({ onChecked }) => {
  const getPrefectureListQuery = useGetPrefectureListSuspenseQuery();
  const [aggregatePrefectures, setAggregatePrefectures] = useState<AggregatePrefecture[]>([]);
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
            onChecked({
              ...aggregatePrefecture,
              isChecked: e.target.checked,
            });
            return {
              ...aggregatePrefecture,
              isChecked: e.target.checked,
            };
          }
          return aggregatePrefecture;
        }),
      );
    },
    [onChecked, aggregatePrefectures],
  );

  return (
    <Suspense fallback={<p>読み込み中</p>}>
      <div className={styles.prefectureList}>
        {aggregatePrefectures.map((aggregatePrefecture) => (
          <CheckBox
            id={`${aggregatePrefecture.prefCode}`}
            checked={aggregatePrefecture.isChecked}
            label={aggregatePrefecture.prefName}
            key={aggregatePrefecture.prefCode}
            onChange={(e) => handleChecked(e, aggregatePrefecture.prefCode)}
          />
        ))}
      </div>
    </Suspense>
  );
};
