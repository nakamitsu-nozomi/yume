import type { ChangeEvent, FC } from 'react';
import './CheckBox.module.css';

interface Props {
  id: string;
  checked: boolean;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: FC<Props> = ({ id, checked, label, onChange }) => {
  return (
    <>
      <input type="checkbox" className="input" onChange={onChange} id={id} checked={checked} />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </>
  );
};
