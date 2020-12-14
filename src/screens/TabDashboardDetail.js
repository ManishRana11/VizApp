import React from 'react';
import DefaultScrollView from '../components/default/DefaultScrollView';
import ChartView from '../components/default/ChartView';
import CogniAreaChart from '../components/CogniAreaChart';
import { mapNameToChart } from '../utils/commonFunctions';
import { areaChartData } from '../chartData';

const TabDashboardDetail = ({ navigation, route }) => {
  return (
    <DefaultScrollView>
      <ChartView title="Area Chart">
        <CogniAreaChart areaChartData={areaChartData} height={200} />
      </ChartView>
    </DefaultScrollView>
  );
};

export default TabDashboardDetail;
