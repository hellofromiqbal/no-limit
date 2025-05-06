import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopulation } from './store/populationSlice';
import type { RootState, AppDispatch } from './store/store';
import LinePopulationChart from './components/LineChart';
import PiePopulationChart from './components/PieChart';
import YearRangeSelector from './components/YearRangeSelector';
import { Container, Typography } from '@mui/material';
import ChartSelector from './components/ChartSelector';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.population);

  const [yearRange, setYearRange] = useState<number[]>([2013, 2021]);
  const [chartType, setChartType] = useState<'line' | 'pie'>('line');

  useEffect(() => {
    dispatch(fetchPopulation());
  }, [dispatch]);

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
        bgcolor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // paddingY: 4,
      }}
    >
      <Typography variant="h4" textAlign="center">
        US Population Dashboard
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
          <>
            <ChartSelector value={chartType} onChange={(newType) => setChartType(newType)} />
            <YearRangeSelector years={years} value={yearRange} onChange={setYearRange} />
          </>
        </>
      )}
    </Container>
  );
};

export default App;
