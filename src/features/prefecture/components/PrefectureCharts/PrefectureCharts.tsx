import { type FC, Suspense } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type Props = {
  dataKeys: string[];
  data?: { year: number; [key: string]: number }[];
};

export const PrefectureCharts: FC<Props> = ({ dataKeys, data }) => {
  return (
    <Suspense>
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
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
