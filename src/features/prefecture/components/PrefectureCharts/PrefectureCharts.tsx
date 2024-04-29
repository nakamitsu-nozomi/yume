import { type FC, Suspense } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './PrefectureCharts.module.css';

export type Props = {
  dataKeys: string[];
  data?: { year: number; [key: string]: number }[];
};

export const PrefectureCharts: FC<Props> = ({ dataKeys, data }) => {
  return (
    <Suspense fallback={<p>読み込み中</p>}>
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
    </Suspense>
  );
};
