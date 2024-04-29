import { type ChangeEvent, type FC, Suspense } from 'react';
import { CheckBox } from '../../../../ui/Checkbox';
import type { AggregatePrefecture } from '../../utils/prefecture.ts';
import styles from './PrefectureList.module.css';

interface Props {
  aggregatePrefectures: AggregatePrefecture[];
  onChecked: (e: ChangeEvent<HTMLInputElement>, prefCode: number) => void;
}

export const PrefectureList: FC<Props> = ({ aggregatePrefectures, onChecked }) => {
  return (
    <Suspense fallback={<p>読み込み中</p>}>
      <div className={styles.prefectureList}>
        {aggregatePrefectures.map((aggregatePrefecture) => (
          <CheckBox
            id={`${aggregatePrefecture.prefCode}`}
            checked={aggregatePrefecture.isChecked}
            label={aggregatePrefecture.prefName}
            key={aggregatePrefecture.prefCode}
            onChange={(e) => onChecked(e, aggregatePrefecture.prefCode)}
          />
        ))}
      </div>
    </Suspense>
  );
};
