/* eslint-disable prettier/prettier */
import { AreaChart } from 'react-native-svg-charts';

export const mapNameToChart = (name) => {
  const nameToChart = {
    'AreaChart': AreaChart,
    'BarGraph': 'BarChart',
    'LineChart': 'LineChart',
    'PieChart': 'PieChart',
    'SingleCircularProgress': 'Table',
    'Histogram': 'BarChart',
    'SimpleTable': 'Table',
    'BubbleChart': 'Table',
    'CandlestickChart': 'Table',
    'SankeyChart': 'Table',
    'ScatterPlot': 'Table',
    'StackedBarGraph': 'StackedBarChart',
    'WaterfallChart': 'Table',
    'TreeMap': 'Table',
    'MixAndMatch': 'Table',
    'SimpleCard': 'Table',
    'BlogCard': 'Table',
    'LiquidGauge': 'Table',
  };

  return nameToChart[name];
};
