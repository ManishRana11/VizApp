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
  MixAndMatch,
  SimpleCard,
  BlogTable,
  LiquidTable,
} from 'react-native-svg-charts';

export const mapNameToChart = (name) => {
  const nameToChart = {
    AreaChart: AreaChart,
    BarGraph: BarChart,
    LineChart: LineChart,
    PieChart: PieChart,
    SingleCircularProgress: SingleCircularProgress,
    Histogram: Histogram,
    SimpleTable: SimpleTable,
    BubbleChart: BubbleChart,
    CandlestickChart: CandlestickChart,
    SankeyChart: SankeyChart,
    ScatterPlot: ScatterPlot,
    StackedBarGraph: StackedBarChart,
    WaterfallTable: WaterfallChart,
    TreeMap: TreeMap,
    MixAndMatch: MixAndMatch,
    SimpleCard: SimpleCard,
    BlogCard: BlogTable,
    LiquidGauge: LiquidTable,
  };

  return nameToChart[name];
};
