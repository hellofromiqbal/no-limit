import { LineChart } from '@mui/x-charts/LineChart';
import type { PopulationData } from '../types/types';

interface Props {
  data: PopulationData[];
};

export default function LinePopulationChart({ data }: Props) {
  return (
    <LineChart
      xAxis={[{ data: data.map(d => d.Year), scaleType: 'band' }]}
      series={[{ data: data.map(d => d.Population) }]}
      width={600}
      height={400}
    />
  );
};