import { LineChart } from '@mui/x-charts/LineChart';
import type { PopulationData } from '../types/types';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface Props {
  data: PopulationData[];
};

export default function LinePopulationChart({ data }: Props) {
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
      <LineChart
        sx={{
          width: '100%',
          height: '100%',
        }}
        xAxis={[{ data: data.map(d => d.Year), scaleType: 'band' }]}
        yAxis={[{ valueFormatter: (value: number) => `${value / 1000000} M` }]}
        series={[{ data: data.map(d => d.Population) }]}
      />
    </Box>
  );
};