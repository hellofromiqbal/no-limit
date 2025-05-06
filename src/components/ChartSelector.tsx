import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
  value: 'line' | 'pie';
  onChange: (chartType: 'line' | 'pie') => void;
};

export default function ChartSelector({ value, onChange }: Props) {
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id="chart-select-label">Chart Type</InputLabel>
      <Select
        labelId="chart-select-label"
        value={value}
        label="Chart Type"
        onChange={(event) => onChange(event.target.value as 'line' | 'pie')}
      >
        <MenuItem value="line">Line Chart</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
      </Select>
    </FormControl>
  );
};