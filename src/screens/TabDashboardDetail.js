import React from 'react';
import DefaultScrollView from '../components/default/DefaultScrollView';
import ChartView from '../components/default/ChartView';
import CogniAreaChart from '../components/CogniAreaChart';
import { areaChartData } from '../chartData';
import CardStructure from '../screens/CardStructure';

const TabDashboardDetail = ({ navigation, route }) => {
  const items = route.params.items;
  return (
    <DefaultScrollView>
      {items.components.map((comp, index) => {
        return (
          <ChartView key={index} title={comp.name}>
            <CardStructure height={200} />
          </ChartView>
        );
      })}
    </DefaultScrollView>
  );
};

export default TabDashboardDetail;
