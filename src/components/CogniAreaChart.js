/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { AreaChart, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const CogniAreaChart = ({ areaChartData, visibility, ...props }) => {
  const xAxis = areaChartData.message.map((item) => item[Object.keys(item)[0]]);
  const areaChartY1 = areaChartData.message.map(
    (item) => item[Object.keys(item)[1]],
  );
  // const areaChartY2 = areaChartData.message.map(
  //   (item) => item[Object.keys(item)[2]],
  // );
  // const areaChartY2 = areaChartData.message.map(
  //   (item) => item[Object.keys(item)[2]],
  // );

  // const yAxis = areaChartY.concat(areaChartY2);

  return (
    <View
      style={{
        height: props.height,
        flexDirection: 'row',
      }}>
      <YAxis
        data={areaChartY1}
        contentInset={{ marginBottom: 20 }}
        svg={{
          fill: 'grey',
          fontSize: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <AreaChart
          style={{ flex: 1 }}
          data={areaChartY1}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />
        <XAxis
          style={{ height: 20 }}
          data={areaChartY1}
          formatLabel={(value, index) => xAxis[index]}
          contentInset={{ left: 30, right: 30 }}
          svg={{
            fill: 'grey',
            fontSize: 12,
            rotation: 45,
            originY: 5,
            y: 15,
          }}
        />
      </View>
    </View>
  );
};

export default CogniAreaChart;
