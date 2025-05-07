import { useEffect, useState } from 'react';
import LinePopulationChart from './components/LineChart';
import PiePopulationChart from './components/PieChart';
import YearRangeSelector from './components/YearRangeSelector';
import { Box, Container, Typography } from '@mui/material';
import ChartSelector from './components/ChartSelector';
import api from './utils/api';
import type { PopulationData } from './types/types';

function App() {
  const [data, setData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState(true);

  const [yearRange, setYearRange] = useState<number[]>([2013, 2021]);
  const [chartType, setChartType] = useState<'line' | 'pie'>('line');

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const res = await api.get('/data?drilldowns=Nation&measures=Population');
        const transformed = res.data.data.map((item: any) => ({
          Year: item.Year,
          Population: item.Population,
        }));
        setData(transformed);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopulationData();
  }, []);

  const filteredData = data.filter(d => {
    const year = Number(d.Year);
    return year >= yearRange[0] && year <= yearRange[1];
  });

  const years = data.map(d => d.Year);

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: 4,
        gap: 4,
      }}
    >
      <Typography variant="h4" fontWeight={700} textAlign="center">
        The USA Population in Charts
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {chartType === 'line' ? (
            <LinePopulationChart data={filteredData} />
          ) : (
            <PiePopulationChart data={filteredData} />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <ChartSelector value={chartType} onChange={setChartType} />
            <YearRangeSelector years={years} value={yearRange} onChange={setYearRange} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default App;
