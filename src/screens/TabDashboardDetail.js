import React from 'react';
import DefaultScrollView from '../components/default/DefaultScrollView';
import ChartView from '../components/default/ChartView';
import CogniAreaChart from '../components/CogniAreaChart';
import { mapNameToChart } from '../utils/commonFunctions';
import { areaChartData } from '../chartData';

const TabDashboardDetail = ({ navigation, route }) => {
  const tabsConfig = route.params.tabsConfig;
  const ChartToDisplay = mapNameToChart();
  return (
    <DefaultScrollView>
      {tabsConfig.components.map((comp) => {
        console.log(tabsConfig.components);
        console.log(tabsConfig.components.comp);
        <ChartView key={comp.name} title={comp.name}>
          <ChartToDisplay areaChartData={areaChartData} height={200} />
        </ChartView>;
      })}
    </DefaultScrollView>
  );
};

export default TabDashboardDetail;
