import { PieChart } from '@mui/x-charts/PieChart';
import type { PopulationData } from '../types/types';

interface Props {
  data: PopulationData[];
};

export default function PiePopulationChart({ data }: Props) {
  return (
    <PieChart
      series={[{
        data: data.map(d => ({ id: d.Year, value: d.Population, label: d.Year })),
      }]}
      width={600}
      height={400}
    />
  );
};