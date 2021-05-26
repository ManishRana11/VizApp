import React from 'react';
import DefaultScrollView from '../components/default/DefaultScrollView';
import ChartView from '../components/default/ChartView';
import CogniAreaChart from '../components/CogniAreaChart';
import { areaChartData } from '../chartData';

const TabDashboardDetail = ({ navigation, route }) => {
  const tabsConfig = route.params.tabsConfig;
  return (
    <DefaultScrollView>
      {tabsConfig.components.map((comp, index) => {
        return (
          <ChartView key={index} title={comp.name}>
            <CogniAreaChart height={200} />
          </ChartView>
        );
      })}
    </DefaultScrollView>
  );
};

export default TabDashboardDetail;
