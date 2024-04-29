import type { ChangeEvent, FC } from 'react';
import { CheckBox } from '../../../../ui/Checkbox';
import type { Prefecture } from '../../domain/entity.ts';
import styles from './PrefectureList.module.css';

interface Props {
  prefectures: Prefecture[];
  checkboxStates: { [prefCode: string]: boolean };
  onChecked: (e: ChangeEvent<HTMLInputElement>, prefCode: number) => void;
}

export const PrefectureList: FC<Props> = ({ prefectures, checkboxStates, onChecked }) => {
  return (
    <div className={styles.prefectureList}>
      {prefectures.map((prefecture) => {
        const value = checkboxStates[prefecture.prefCode] ? checkboxStates[prefecture.prefCode] : false;
        return (
          <CheckBox
            id={`${prefecture.prefCode}`}
            checked={value}
            label={prefecture.prefName}
            key={prefecture.prefCode}
            onChange={(e) => onChecked(e, prefecture.prefCode)}
          />
        );
      })}
    </div>
  );
};
