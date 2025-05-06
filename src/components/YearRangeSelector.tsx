import { Box, Slider } from '@mui/material';

interface Props {
  years: string[];
  value: number[];
  onChange: (newRange: number[]) => void;
};

export default function YearRangeSelector({ years, value, onChange }: Props) {
  const numericYears = years.map(Number);

  return (
    <Box width={300}>
      <Slider
        min={Math.min(...numericYears)}
        max={Math.max(...numericYears)}
        value={value}
        onChange={(_, newValue) => onChange(newValue as number[])}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};