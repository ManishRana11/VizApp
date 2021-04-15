import React from 'react';
import DefaultScrollView from '../components/default/DefaultScrollView';
import ChartView from '../components/default/ChartView';
import CogniAreaChart from '../components/CogniAreaChart';
import { mapNameToChart } from '../utils/commonFunctions';
import { areaChartData } from '../chartData';

const TabDashboardDetail = ({ navigation, route }) => {
  const title = route.params.chartName;
  return (
    <DefaultScrollView>
      <ChartView title={title}>
        <CogniAreaChart areaChartData={areaChartData} height={200} />
      </ChartView>
    </DefaultScrollView>
  );
};

export default TabDashboardDetail;
