import { PieChart } from '@mui/x-charts/PieChart';
import type { PopulationData } from '../types/types';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface Props {
  data: PopulationData[];
};

export default function PiePopulationChart({ data }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        width: isDesktop ? '50%' : isTablet ? '75%' : isMobile ? '100%' : '100%',
        height: 300,
      }}
    >
      <PieChart
        sx={{
          width: '100%',
          height: '100%',
        }}
        series={[{
          data: data.map(d => ({ id: d.Year, value: d.Population, label: d.Year })),
        }]}
      />
    </Box>
  );
};