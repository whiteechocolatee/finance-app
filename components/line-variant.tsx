import { format } from 'date-fns';
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { CustomTooltip } from './custom-tooltip';

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={'date'}
          tickFormatter={(value) => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dot={false}
          dataKey='income'
          className='drop-shadow-sm'
          stroke='#3d82f6'
          strokeWidth={2}
        />
        <Line
          dot={false}
          dataKey='expenses'
          className='drop-shadow-sm'
          stroke='#f43f5e'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
