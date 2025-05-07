import { Box, Slider, Typography, useMediaQuery, useTheme } from '@mui/material';

interface Props {
  years: string[];
  value: number[];
  onChange: (newRange: number[]) => void;
};

export default function YearRangeSelector({ years, value, onChange }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const numericYears = years.map(Number);

  return (
    <Box
      sx={{
        width: isDesktop ? 300 : isTablet ? 250 : isMobile ? 200 : 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='caption'>Year filter</Typography>
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