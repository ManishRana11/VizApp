import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  SingleCircularProgress,
  Histogram,
  SimpleTable,
  BubbleChart,
  CandlestickChart,
  SankeyChart,
  ScatterPlot,
  StackedBarChart,
  WaterfallChart,
  TreeMap,
  LineChartGate,
  MixAndMatch,
  SimpleCard,
  BlogTable,
  BlogCard,
  LiquidTable,
} from 'react-native-svg-charts';

export const mapNameToChart = (name) => {
  const nameToChart = {
    AreaChart: AreaChart,
    BarGraph: BarChart,
    BarChart: BarChart, //NEWLYADDED
    LineChart: LineChart,
    LineChartGate: LineChartGate,
    PieChart: PieChart,
    SingleCircularProgress: SingleCircularProgress,
    Histogram: Histogram,
    SimpleTable: SimpleTable,
    BubbleChart: BubbleChart,
    CandlestickChart: CandlestickChart,
    SankeyChart: SankeyChart,
    ScatterPlot: ScatterPlot,
    StackedBarGraph: StackedBarChart,
    StackedBarChartGate: StackedBarChart, //NEWLY ADDED
    WaterfallTable: WaterfallChart,
    TreeMap: TreeMap,
    MixAndMatch: MixAndMatch,
    SimpleCard: SimpleCard,
    BlogCard: BlogTable,
    BlogTable: BlogCard, //NEWLY ADDED
    LiquidGauge: LiquidTable,
  };

  return nameToChart[name];
};
